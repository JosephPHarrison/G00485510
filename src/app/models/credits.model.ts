// Describes a single cast member (actor) from a mvie's credits
export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string;
}

// Describes a single crew member (writer director etc.) from a movie's credits
export interface CrewMember {
    id: number;
    name: string;
    job: string;
    profile_path: string;
}