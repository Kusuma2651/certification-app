import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCertification } from "../redux/certificationSlice";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "../styles/styles.css";

const CertificationForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [issuer, setIssuer] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ name?: string; issuer?: string; file?: string }>({});

    const validate = () => {
        let newErrors: { name?: string; issuer?: string; file?: string } = {};
        if (!name.trim()) newErrors.name = "Certification name is required.";
        if (!issuer.trim()) newErrors.issuer = "Issuer is required.";
        if (!file) newErrors.file = "File is required.";
        else if (!["application/pdf", "image/jpeg"].includes(file.type)) newErrors.file = "Only PDF or JPG files are allowed.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFile(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate() && file) {
            const reader = new FileReader();
            reader.onload = () => {
                dispatch(addCertification({ name, issuer, file: reader.result as string }));
                navigate("/list");
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container">
            <h2>Add Certification</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Certification Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    {errors.name && <p className="error">{errors.name}</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Issuer</Form.Label>
                    <Form.Control type="text" value={issuer} onChange={(e) => setIssuer(e.target.value)} />
                    {errors.issuer && <p className="error">{errors.issuer}</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Upload Certificate (PDF/JPG)</Form.Label>
                    <Form.Control type="file" accept=".pdf,.jpg" onChange={handleFileChange} />
                    {errors.file && <p className="error">{errors.file}</p>}
                </Form.Group>
                <Button type="submit">Save Certification</Button>
            </Form>
        </div>
    );
};

export default CertificationForm;
