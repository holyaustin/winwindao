import Image from 'next/image';
import { useContext, useRef, useState } from "react";
import { TransactionContext } from '../context/TransactionContext';
import { storeFiles } from "../lib/web3storage";

// Should be able to upload images to IPFS and store the hash in the database 

export default function ProjectSubmissionForm({ setLoading }) {
    const fileInputRef = useRef();
    const [name, setName] = useState('');
    const [description, setDescription] = useState({});
    const [price, setPrice] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [files, setFiles] = useState([]);
    const [increment, setIncrement] = useState(0);
    const createProposal  = useContext(TransactionContext)

    const handleFileChange = (e) => {
        if (!e.target.files) { return fileInputRef.current.value = null; };

        const fileTypeRegex = /(\.jpg|\.jpeg|\.png|\.pdf|\.doc|\.docx)$/i;
        if (!fileTypeRegex.test(e.target.files[0].name)) {
            alert("File type not supported. Only jpg, doc, pdf, jpeg, and png files are supported.");
            return fileInputRef.current.value = null;
        }

        setIncrement(increment + 1);

        const fileName = name.split(" ").join("").toLowerCase();
        const ext = e.target.files[0].name.substr(e.target.files[0].name.lastIndexOf('.') + 1);
        const imgObj = {
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
            name: fileName + "_" + increment + "." + ext
        }
        setFiles([...files, imgObj]);
        return fileInputRef.current.value = null;
    }

    const handleDataBeforeSendingToBlockchain = async () => {
        const image_hash = await storeFiles(files);
        const descriptionString = JSON.stringify(description);
        const data = {
            price,
            name,
            description: descriptionString,
            longitude,
            latitude,
            image_hash
        }
        return data;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            setLoading(true);
            const response = await handleDataBeforeSendingToBlockchain();
            if (response) {
                console.log("success", response);
                try {
                    const createPropertyOnChain = await createProperty(response);
                    if (createPropertyOnChain) {
                        alert("Project Submitted Successfully!");
                        setLoading(false);
                        return clearForm();
                    } else {
                        const message = error.message ? error.message : "Error creating property on blockchain. Please try again.";
                        alert(`Error: ${message}`);
                    }
                } catch (error) {
                    setLoading(false);
                    console.error(error);
                    const message = error.message ? error.message : "Error creating property on blockchain. Please try again.";
                    alert(`Error: ${message}`);
                }
            }
        }
    }

    const isFormValid = () => {
        if (!name || !description || !price || !files.length >= 1) {
            alert("Please fill out all fields.");
            return false;
        }
        return true;
    }

    const clearImage = (index) => {
        setIncrement(increment + 1);
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    }

    const clearForm = () => {
        setName('');
        setDescription({});
        setPrice('');
        setLatitude('');
        setLongitude('');
        setFiles([]);
    }

    return (
                <div className=" justify-center pb-12">

                    <div className="w-full py-4  text-center border">
                    <div className="mb-2 mt-2 rounded p-4 ">
                    <p className="text-center text-2xl">Project Name</p>
                    <input type="text" className="text-2xl bg-gray-200 w-full px-2 py-1 rounded text-black"
                        placeholder="Project Name" value={name || ''} onChange={(e) => setName(e.target.value)} />
                    </div>
                        <div className="mb-2 mt-2 rounded p-4 ">
                        
                        <p className="text-center text-2xl">Brief Description</p>
                            <textarea type="text" className="text-2xl bg-gray-200 w-full px-2 py-1 rounded text-black"
                                placeholder="Description" value={description.description || ''} onChange={(e) => setDescription({ ...description, description: e.target.value })} />
                        </div>
                        <div className="mb-3 mt-2 rounded p-4">
                        
                        <p className="text-center text-2xl">Expected Project Budget(USD)</p>
                            <input type="number" className="text-2xl bg-gray-200 w-full px-2 py-1 rounded text-black"
                                placeholder="Price" value={price || ''} onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        <div className="pb-2 text-center mt-2 rounded p-4">
                        <p className="text-center pb-3 text-2xl">Upload Files</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {files && files.map((file, index) => { return <Image src={file.preview} width="150" height="150" onClick={() => clearImage(index)} key={index} /> })}
                        </div>
                    </div>
                    <hr />
                    <div className="pb-20 ">
                        <input type="file" accept="image/jpg,image/png" name="image" className="ml-5 text-2xl py-3 justify-center" id="image" ref={fileInputRef} disabled={files.length >= 5 && true} onChange={handleFileChange} />

                        <div className="flex flex-row ">
                            <button onClick={handleSubmit} className="text-2xl w-1/2 bg-green-500 block rounded cursor-pointer px-2 py-1 m-3 hover:bg-orange-400">
                                Submit
                            </button>
                            <button onClick={clearForm} className="text-2xl w-1/2 bg-green-400 block rounded cursor-pointer px-2 py-1  m-3 hover:bg-orange-400">Clear</button>
                        </div>
                    </div>

                    </div>
                </div>
   

    )
}