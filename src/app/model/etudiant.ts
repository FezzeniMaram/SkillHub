// src/app/models/etudiant.model.ts
export class Etudiant {
    nomEtudiant: string;
    emailEtudiant: string;
    motPasseEtudiant: string;
    role: string; // "etudiant" ou "tuteur"

    constructor(nomEtudiant: string, emailEtudiant: string, motPasseEtudiant: string, role: string) {
        this.nomEtudiant = nomEtudiant;
        this.emailEtudiant = emailEtudiant;
        this.motPasseEtudiant = motPasseEtudiant;
        this.role = role;
    }
}
