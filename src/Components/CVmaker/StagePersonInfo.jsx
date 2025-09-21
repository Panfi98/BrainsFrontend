import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import './CVmaker.css';
import { CreatePerson } from "../../Fetcher/PostFetcher/CreatePerson.js";
import { ProgressBar } from "./CvComponets/Progress-bar.jsx";

const StagePersonInfo = () => {
    const [personData, setPersonData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        birthday: "",
        pictureURL: "",
        summary: "",
        status: "InProgress",
    });

    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    const navigate = useNavigate();

    // утилита: File → DataURL
    const fileToDataURL = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result); // data:image/...;base64,...
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    // общий обработчик
    const onChange = async (e) => {
        const { name, value, files } = e.target;

        if (name === "pictureURL" && files && files[0]) {
            const file = files[0];
            const dataUrl = await fileToDataURL(file); // преобразуем в data URL
            setPersonData((prev) => ({
                ...prev,
                pictureURL: dataUrl, // сохраняем data URL
                pictureFile: file,   // если захочешь отправить как файл
            }));
        } else {
            setPersonData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const isFulled =
        personData.firstName.trim() !== "" &&
        personData.lastName.trim() !== "" &&
        personData.birthday.trim() !== "" &&
        personData.email.trim() !== "" &&
        personData.phoneNumber.trim() !== "" &&
        personData.address.trim() !== "" &&
        personData.pictureURL.trim() !== "";

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!isFulled) {
            alert("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            const response = await CreatePerson(personData, token);
            console.log("Sending personal info:", personData);
            if (response.ok) {
                const responceData = await response.json();
                const resumeId = responceData.data.id;
                console.log("Resume ID:", resumeId);
                navigate(`/cv/${resumeId}/education`);
            }
        } catch (error) {
            console.error("Personal info error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="cv-maker-container">
            <ProgressBar id={null} />
            <div className="cv-maker">
                <div className="cv-maker-header">
                    <h1>CV Maker</h1>
                    <h2>Stage 1</h2>
                </div>
                <div className="cv-form">
                    <form onSubmit={onSubmit}>
                        <div className="cv-block">
                            <h2>Personal info</h2>
                            <div className="input-group">
                                <label htmlFor="firstName">First name:</label>
                                <input type="text" id="firstName" name="firstName" onChange={onChange} />
                            </div>

                            <div className="input-group">
                                <label htmlFor="lastName">Last name:</label>
                                <input type="text" id="lastName" name="lastName" onChange={onChange} />
                            </div>

                            <div className="input-group">
                                <label htmlFor="birthday">Date of birth:</label>
                                <input type="date" id="birthday" name="birthday" onChange={onChange} />
                            </div>

                            <div className="input-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" onChange={onChange} />
                            </div>

                            <div className="input-group">
                                <label htmlFor="phoneNumber">Phone:</label>
                                <input type="text" id="phoneNumber" name="phoneNumber" onChange={onChange} />
                            </div>

                            <div className="input-group">
                                <label htmlFor="address">Address:</label>
                                <input type="text" id="address" name="address" onChange={onChange} />
                            </div>

                            <div className="input-group">
                                <label htmlFor="pictureURL">Your photo:</label>
                                <input
                                    type="file"
                                    id="pictureURL"
                                    name="pictureURL"
                                    accept="image/*"
                                    onChange={onChange}
                                />
                                {personData.pictureURL && (
                                    <img
                                        src={personData.pictureURL}
                                        alt="Preview"
                                        style={{ width: "150px", marginTop: "10px", borderRadius: "8px" }}
                                    />
                                )}
                            </div>

                            <div className="input-group">
                                <label htmlFor="summary">About you:</label>
                                <TextareaAutosize id="summary" name="summary" onChange={onChange} minRows={3} maxRows={30} />
                            </div>

                            <div className="button-group">
                                <button
                                    type="button"
                                    onClick={() => navigate("/your-applications")}
                                    className="previous-btn"
                                >
                                    Previous stage
                                </button>
                                <button
                                    type="submit"
                                    className={`next-btn ${!isFulled ? "disabled" : ""}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Loading..." : "Next stage"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="cv-tips">
                <p>Tips</p>
                <ul>
                    <li>Make sure to include all relevant certifications.</li>
                    <li>Double-check the dates and URLs for accuracy.</li>
                    <li>Keep your descriptions concise and to the point.</li>
                </ul>
            </div>
        </div>
    );
};

export default StagePersonInfo;
