

export interface venteAnnuelle {
    annee: String
    total: number
}

export interface depenseM {
    mois: number
    total: number
}

export interface vendeur {
    nom: String
    prenom: String
    vente: number
}

export interface vendeuri {
    vendeurId: number
    total: number
}

export interface historique {
    mois:number
    total:number
}

export interface inventaire{
    description: string
    date: string
    total: number
}

export interface medocsPerimes {
    libelle: string
    quantite: number
    date:string
    prix: number
}
export interface remboursement {
    nom: string
    date: string
    total: number
}

export interface venteEffectue {
    libelle: string
    cout: number
    quantite: number
    createdAt: string
}