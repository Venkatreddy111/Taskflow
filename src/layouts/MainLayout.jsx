import { BottomNav, ProfileSidebar } from "../components";
const MainLayout = ({ children }) => {
    return (<>
      <ProfileSidebar />
      {children}
      <div style={{ marginTop: "128px" }}/>
      <BottomNav />
    </>);
};
export default MainLayout;
