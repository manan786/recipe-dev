import LoginForm from "./Components/LoginForm";



export const generateMetadata = async () => {
  const metadata = {
    title: "Admin | Login",
  };
  return metadata;
};

const page = () => {
  return (
    <main className="LoginPage">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h1 className="MostS mb-5">Most Searched Recipies</h1>
          </div>
          <div className="col-md-12">
            <div className="SettingsWrapp LoginWrapp pt-4">
              <div className="InputWrapp" style={{ maxWidth: "100%" }}>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
