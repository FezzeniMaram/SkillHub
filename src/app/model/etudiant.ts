export class Etudiant {
    nomEtudiant: string;
    emailEtudiant: string;
    motPasseEtudiant: string;
    role: string;
    constructor(nomEtudiant: string, emailEtudiant: string, motPasseEtudiant: string, role: string) {
        this.nomEtudiant = nomEtudiant;
        this.emailEtudiant = emailEtudiant;
        this.motPasseEtudiant = motPasseEtudiant;
        this.role = role;
    }
}
