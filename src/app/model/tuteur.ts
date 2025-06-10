export class Tuteur {
  idTuteur: number;
  nomTuteur: string;
  emailTuteur: string;
  motPasseTuteur: string;
  role: string;

  constructor(
    idTuteur: number,
    nomTuteur: string,
    emailTuteur: string,
    motPasseTuteur: string,
    role: string = "tuteur"
  ) {
    this.idTuteur = idTuteur;
    this.nomTuteur = nomTuteur;
    this.emailTuteur = emailTuteur;
    this.motPasseTuteur = motPasseTuteur;
    this.role = role;
  }
}
