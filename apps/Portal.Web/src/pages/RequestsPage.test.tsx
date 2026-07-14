import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../test/renderWithProviders";
import { RequestsPage } from "./RequestsPage";

// Replace the app's singleton adapter with a zero-latency mock so the whole
// module graph (page -> hooks -> adapter) resolves to one controllable mock.
vi.mock("../api/requestsApi", async () => {
  const { createMockRequestsApi } = await import("@adaptivecash/testing");
  const controller = createMockRequestsApi({ latencyMs: 0 });
  return { requestsApiMock: controller, requestsApi: controller.api };
});

// Pulls the very controller injected above (this module path is mocked).
import { requestsApiMock } from "../api/requestsApi";

beforeEach(() => {
  requestsApiMock.reset();
});

describe("RequestsPage", () => {
  it("shows a loading state, then the requests, then filters by search", async () => {
    renderWithProviders(<RequestsPage navigate={vi.fn()} />);

    // Loading state is observable before data resolves. ("Loading requests…"
    // renders twice — header text and the spinner label — so match the spinner.)
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    // Populated: both seed requests are present.
    expect(await screen.findByText("REQ-2026-0142")).toBeInTheDocument();
    expect(screen.getByText("REQ-2026-0143")).toBeInTheDocument();

    // Filtering by an id fragment narrows the list to a single request.
    fireEvent.change(
      screen.getByPlaceholderText(/request id, applicant or branch/i),
      { target: { value: "0142" } },
    );

    await waitFor(() =>
      expect(screen.queryByText("REQ-2026-0143")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("REQ-2026-0142")).toBeInTheDocument();
  });

  it("renders a load error with a Retry that recovers", async () => {
    requestsApiMock.failNext("list"); // first list call throws 503

    renderWithProviders(<RequestsPage navigate={vi.fn()} />);

    // Error state with an explicit recovery affordance (retry: false globally).
    const retry = await screen.findByRole("button", { name: /retry/i });
    expect(screen.getByText(/could not load requests/i)).toBeInTheDocument();

    // Retry re-runs the query; the failure was one-shot, so data now loads.
    fireEvent.click(retry);

    expect(await screen.findByText("REQ-2026-0142")).toBeInTheDocument();
    expect(screen.queryByText(/could not load requests/i)).not.toBeInTheDocument();
  });
});
