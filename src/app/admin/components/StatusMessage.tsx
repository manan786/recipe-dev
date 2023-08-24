import React from "react";

const StatusMessage = ({
  LoginState,
  setLoginState,
}: {
  LoginState: { error: string | undefined; success: string | undefined };
  setLoginState: React.Dispatch<
    React.SetStateAction<{
      error: string | undefined;
      success: string | undefined;
    }>
  >;
}) => {
  return (
    <>
      {LoginState?.error && (
        <div
          className="alert alert-danger alert-dismissible fade show py-2"
          role="alert"
        >
          {LoginState?.error}
          <button
            type="button"
            onClick={() =>
              setLoginState((prev: any) => {
                return { ...prev, error: undefined };
              })
            }
            className="btn-close BtnClose"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      )}
      {LoginState?.success && (
        <div
          className="alert alert-success alert-dismissible fade show py-2"
          role="alert"
        >
          {LoginState?.success}
          <button
            type="button"
            onClick={() =>
              setLoginState((prev: any) => {
                return { ...prev, success: undefined };
              })
            }
            className="btn-close BtnClose"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default StatusMessage;
