import { Routes, Route } from "react-router";
import { GeneralPosts } from "../pages";
import { Charts } from "../pages/Charts";
import { GeneralInformation } from "../pages/GeneralInformation";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<GeneralInformation />} />
            <Route path="/social-media-posts" element={<GeneralPosts />} />
            <Route path="/charts" element={<Charts />} />
        </Routes>
    )
}
