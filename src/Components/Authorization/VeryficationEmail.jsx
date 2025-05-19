import {useState, useEffect} from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { Verification } from "../../Fetcher/Verification";

const VeryficationEmail = ({ userId }) => {

    const [isOpen, setIsOpen] = useState(true);
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    
    const Confirm = async (e) => {
        e.preventDefault();

        if (!code) {
            alert("Please enter the code");
            return;
        }
        if (code.length !== 6) {
            alert("Code must be 6 characters long");
            return;
        }

        try {
            const response = await Verification(userId, code);
            console.log("Verification response:", response);
            console.log("Boolian result:", response.status === true);
            if (response.success === true) {
                navigate("/login");
                console.log("Verification successful");
                setIsOpen(false);
            } else {
                alert("Verification failed. Please try again.");
            }
        } catch (error) {
            console.error("Error verifying code:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    const Countdown = ({start = 9000000}) => {
        const [timeLeft, setTimeLeft] = useState(start);

        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft((prev) => (prev > 0 ? prev - 1000 : 0));
            }, 1000);

            return () => clearInterval(timer);
        }, []);

        return (
            <div>
                <p>time counter while code sent is active: {timeLeft / 1000}</p>
            </div>
        );
    };

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <h2>Verification</h2>
        <Countdown />
        <p>Fill in the code that is sent to your mail</p>
        <input
            type="text"
            maxLength={6}
            minLength={6}
            onChange={(e) => setCode(e.target.value)}
            required
        />
        <button onClick={Confirm}>Confirm</button>
    </Modal>
  );
};

export default VeryficationEmail;
