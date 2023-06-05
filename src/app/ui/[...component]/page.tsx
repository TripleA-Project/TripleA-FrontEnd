import Test from '@/components/ComponentTest';

interface UIComponentTestProps {
  params: {
    component: string[];
  };
}

async function UIComponentTest({ params: { component } }: UIComponentTestProps) {
  const name = component.length === 1 ? component.join('') : component.join('/');

  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Test name={name} />
    </>
  );
}

export default UIComponentTest;
