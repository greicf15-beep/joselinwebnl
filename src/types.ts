export interface PersonalData {
  nombre: string;
  edad: number;
  estatura: string; // e.g. "1.65 m"
  peso: string; // e.g. "62 kg"
}

export interface ObjetivosData {
  objetivos: string[]; // ['musculo', 'grasa', 'fuerza', 'resistencia', 'salud']
  objetivosOtros: string;
}

export interface DisponibilidadData {
  diasSemana: number; // 2, 3, 4, 5, 6
  tiempoSesion: string; // "45 min", "1 hora", "1.5 horas"
  lugar: 'gimnasio' | 'casa' | 'mixto';
  equipamientoCasa: string;
}

export interface ExperienciaData {
  nivel: 'principiante' | 'intermedio' | 'avanzado';
  entrenandoActualmente: 'si' | 'no';
  rutinaActual: string;
  ejerciciosBasicos: 'conoce' | 'guiado';
}

export interface SaludData {
  lesiones: string;
  otrasActividades: string;
}

export interface PreferenciasData {
  gustaEvitar: string;
  cardioPreferencia: 'final' | 'separado' | 'ninguno';
}

export interface QuestionnaireResponse {
  id: string;
  fecha: string;
  email: string;
  planComprado: string;
  estado: 'Pendiente' | 'En Proceso' | 'Completado';
  personal: PersonalData;
  objetivos: ObjetivosData;
  disponibilidad: DisponibilidadData;
  experiencia: ExperienciaData;
  salud: SaludData;
  preferencias: PreferenciasData;
  notasCoach?: string; // For Joselin's feedback
}

export interface PlanOption {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  isPopular: boolean;
  features: string[];
}
