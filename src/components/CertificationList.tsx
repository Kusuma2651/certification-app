import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import "../styles/styles.css";

const CertificationList: React.FC = () => {
    const certifications = useSelector((state: RootState) => state.certification.certifications);
    const navigate = useNavigate();

    return (
        <div className="container-list">
            <h2>Saved Certifications</h2>
            {certifications.length === 0 ? (
                <p>No certifications added yet.</p>
            ) : (
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Certification Name</th>
                            <th>Issuer</th>
                            <th>Certificate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {certifications.map((cert, index) => (
                            <tr key={index}>
                                <td>{cert.name}</td>
                                <td>{cert.issuer}</td>
                                <td>
                                    <Button variant="link" onClick={() => window.open(cert.file, "_blank")}>
                                        View Certificate
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <Button onClick={() => navigate("/")}>Add Another</Button>
        </div>
    );
};

export default CertificationList;
