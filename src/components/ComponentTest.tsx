async function Test({ name }: { name: string }) {
  const TestComponent = (await import(`../components/${name}`)).default;

  return (
    <div className="w-full h-screen box-border flex justify-center items-center">
      <TestComponent />
    </div>
  );
}

export default Test;
