import { retrieveFieldErrors } from "@/utils/errors-client";

type DisplayErrorsProps = {
  errors: Record<string, string[]>;
  fieldName: string;
};
export default function DisplayErrors({
  errors,
  fieldName,
}: DisplayErrorsProps) {
  const fieldErrors = retrieveFieldErrors(errors, fieldName);

  if (fieldErrors == null) return <></>;

  return (
    <ul className="text-red-400 mx-2">
      {fieldErrors.map((err, idx) => {
        return <li key={idx}>{err}</li>;
      })}
    </ul>
  );
}
