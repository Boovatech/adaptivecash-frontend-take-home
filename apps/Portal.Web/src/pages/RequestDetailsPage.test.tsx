import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../test/renderWithProviders";
import { RequestDetailPage } from "./RequestDetailsPage";

vi.mock("../api/requestsApi", async () => {
  const { createMockRequestsApi } = await import("@adaptivecash/testing");
  const controller = createMockRequestsApi({ latencyMs: 0 });
  return { requestsApiMock: controller, requestsApi: controller.api };
});

import { requestsApiMock } from "../api/requestsApi";

const READY_REQUEST = "REQ-2026-0142";

beforeEach(() => {
  requestsApiMock.reset();
});

async function openSigningDialog() {
  renderWithProviders(
    <RequestDetailPage requestId={READY_REQUEST} navigate={vi.fn()} />,
  );

  // The signing entry point only appears once the server-loaded status is
  // ReadyForSignature.
  const openButton = await screen.findByRole("button", {
    name: /review and sign/i,
  });
  fireEvent.click(openButton);

  return {
    confirm: await screen.findByRole("button", { name: /confirm and sign/i }),
  };
}

describe("Request signing flow", () => {
  it("does not call the signing API until confirmed, then exactly once (double-click safe)", async () => {
    const { confirm } = await openSigningDialog();

    // Opening the confirmation dialog must not have started a session.
    expect(requestsApiMock.getCallCount("createSigningSession")).toBe(0);

    // Double-click the confirm button.
    fireEvent.click(confirm);
    fireEvent.click(confirm);

    // Exactly one side effect, despite two clicks.
    await waitFor(() =>
      expect(requestsApiMock.getCallCount("createSigningSession")).toBe(1),
    );
    // Give any erroneous second call a chance to land, then re-assert.
    await Promise.resolve();
    expect(requestsApiMock.getCallCount("createSigningSession")).toBe(1);
  });

  it("never shows Verified before the provider poll returns it, then reaches Verified", async () => {
    const { confirm } = await openSigningDialog();
    fireEvent.click(confirm);

    // Session is Pending/AwaitingProvider: a terminal result must NOT be shown.
    // (Awaiting findByText is itself the assertion; the node may re-render, so
    // don't hold a reference to it across the poll.)
    await screen.findByText(/waiting for the provider/i);
    // Exact string targets the dialog's terminal heading, not the "Provider
    // signature verified" evidence row the request gains once submitted.
    expect(screen.queryByText("Signature verified")).not.toBeInTheDocument();

    // Only after the provider poll resolves does the verified state appear.
    await screen.findByText("Signature verified", undefined, { timeout: 5000 });
  }, 15000);

  it("surfaces a Failed provider outcome", async () => {
    requestsApiMock.setSigningOutcome("Failed");
    const { confirm } = await openSigningDialog();
    fireEvent.click(confirm);

    // Exact string targets the dialog heading, not the "Signing session failed"
    // evidence row.
    await screen.findByText("Signing failed", undefined, { timeout: 5000 });
    expect(screen.queryByText("Signature verified")).not.toBeInTheDocument();
  }, 15000);
});
