import { useState } from "react";
import { Layout } from "../components";
import ProjectSubmissionForm from "../components/ProjectSubmissionForm";

export default function ProjectSubmission() {
    const [loading, setLoading] = useState(false);
    return (
        <div className="bg-black h-screen">
        <Layout>
        <div className="w-full md:justify-center  items-center ">
                <div className="flex flex-col py-3 w-full">
                    <h1 className="text-4xl font-bold text-center pb-3">Project Proposal Submission</h1>
                    <p className="text-center pb-3">Submit a project proposal to WinWinDAO.</p>
                </div>
                <div className="flex justify-center sm:pb-10">
                    {loading ? (
                        <div className="h-screen text-xl flex justify-center items-center">Loading...</div>
                    ) : (
                        <ProjectSubmissionForm setLoading={setLoading} />
                    )}
                </div>
            </div>
        </Layout>
        </div>
    )

}