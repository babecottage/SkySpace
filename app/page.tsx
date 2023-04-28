export default function IndexPage() {
  return (
    <main
      className="flex flex-col items-center justify-center h-screen w-screen"
      style={{
        backgroundColor: "lime",
      }}
    >
      <h1
        className="py-4 text-6xl mb-8"
        style={{
          fontFamily:
            '"Comic Sans MS", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
        }}
      >
        SkySpace
      </h1>
      <img src="/underconstruction.gif" />
    </main>
  );
}
