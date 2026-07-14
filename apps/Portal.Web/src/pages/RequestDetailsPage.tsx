export function RequestDetailPage({requestId, navigate}: {
  requestId: string;
  navigate: (path: string) => void;
}) {
  return (
    <div className="p-4">
      <h2 className="mt-0">Request {requestId}</h2>
    </div>
  );
}
  