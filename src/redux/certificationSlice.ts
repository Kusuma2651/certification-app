import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Certification {
    name: string;
    issuer: string;
    file: string;
}

interface CertificationState {
    certifications: Certification[];
}

// Load certifications from localStorage
const loadCertifications = (): Certification[] => {
    const savedCerts = localStorage.getItem("certifications");
    return savedCerts ? JSON.parse(savedCerts) : [];
};

const initialState: CertificationState = {
    certifications: loadCertifications(),
};

const certificationSlice = createSlice({
    name: "certification",
    initialState,
    reducers: {
        addCertification: (state, action: PayloadAction<Certification>) => {
            state.certifications.push(action.payload);
            localStorage.setItem("certifications", JSON.stringify(state.certifications));
        }
    }
});

export const { addCertification } = certificationSlice.actions;
export default certificationSlice.reducer;
