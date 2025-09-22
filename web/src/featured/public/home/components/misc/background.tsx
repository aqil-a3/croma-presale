export function Background() {
  return (
    <>
      <div className="absolute inset-0 bg-[url('/images/background/dashboard/bg-01.png')] bg-cover bg-no-repeat bg-center" />
      <div className="absolute inset-0 bg-[url('/images/background/dashboard/bg-02.png')] bg-cover bg-no-repeat bg-center opacity-50 rotate-180 max-h-screen" />
    </>
  );
}
