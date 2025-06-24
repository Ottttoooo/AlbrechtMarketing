import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 mt-8">{title}</h2>
      <div className="grid gap-x-4 gap-y-2 justify-start grid-cols-[auto minmax(auto, 400px)]">
        {children}
      </div>
    </>
  );
}
