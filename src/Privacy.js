import TitleBar from "./TitleBar";
import Paper from '@mui/material/Paper';

function Privacy() {
    return (
        <div className="contentbackground">
            <TitleBar title="PRIVACY POLICY" />
            <div className="contentwrapper">                
                    <Paper style={{ borderRadius:"0px", margin: "16px", padding: "16px", fontSize: "18px", lineHeight: "28px" }} >
                    <p>
                        Country Video Games respects your privacy and is committed to protecting it. This Privacy Policy explains how we collect, use, and disclose information about you when you visit our website or use our services.
                    </p>
                    <i>County Video Games.</i>
                    <ul>
                        <li>Does Not Collect your personal information to sell or donate.</li>
                        <li>Uses modern accuracy assurance practices to guard against breaches.</li>
                        <li>Corona has baked in powerful security and massively scales across a big computer.</li>
                    </ul>
                    <p className="signature">
                        Todd Bandrowsky
                    </p>
                    </Paper>
            </div>
        </div>
    );
}

export default Privacy;
