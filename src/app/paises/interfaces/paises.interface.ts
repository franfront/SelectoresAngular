export interface PaisSmall {
  name: Name;
  cca3: string;
  
}

export interface Name {
  official: string;
  common: string;
}

export interface Pais {
    name:         Name;
    cca3:         string;
   
    borders:      string[];
   
}
