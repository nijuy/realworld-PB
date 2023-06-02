import { IError } from '../types/error.type';

const ErrorPrint = ({ errors }: IError) => {
  let errorMessages: string[] = [];

  for (const error in errors) {
    errorMessages.push(`${error} ${errors[error]}`);
  }
  return (
    <>
      {errorMessages.map((errorMessagesData, index) => (
        <li key={index}> {errorMessagesData} </li>
      ))}
    </>
  );
};

export default ErrorPrint;
