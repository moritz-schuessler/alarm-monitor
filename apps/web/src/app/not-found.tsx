import { redirect } from "next/navigation";

const NotFoundPage = () => {
  redirect("/select-incident");

  return <div>404 - Page Not Found</div>;
};

export default NotFoundPage;
