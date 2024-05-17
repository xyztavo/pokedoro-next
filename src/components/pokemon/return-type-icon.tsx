import { Brain, Bug, Circle, Earth, Feather, Ghost, GlassWater, Leaf, Moon, Mountain, Shield, Skull, Snowflake, Sparkles, Sword } from "lucide-react";

export function returnTypeIcon(type: string) {
    switch (type) {
        case 'Fire':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                    <path d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                </svg>
            );
        case 'Water':
            return (
                <GlassWater />
            );
        case 'Flying':
            return (
                <Feather />
            );
        case 'Grass':
            return (
                <Leaf />
            );
        case 'Poison':
            return (
                <Skull />
            );
        case 'Bug':
            return (
                <Bug />
            );
        case 'Normal':
            return (
                <Circle />
            );
        case 'Electric':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>
                </svg>
            );
        case 'Fighting':
            return (
                <Sword />
            );
        case 'Ice':
            return (
                <Snowflake />
            );
        case 'Ground':
            return (
                <Earth />
            );
        case 'Psychic':
            return (
                <Brain />
            );
        case 'Fairy':
            return (
                <Sparkles />
            );
        case 'Dark':
            return (
                <Moon />
            );
        case 'Steel':
            return (
                <Shield />
            );
        case 'Ghost':
            return (
                <Ghost />
            );
        case 'Rock':
            return (
                <Mountain />
            );
        case 'Dragon':
            return (
                <span className="flex flex-row items-center gap-2 p-2" >
                    Dragon
                </span>
            );
        default:
            return <span className="flex flex-row items-center gap-2 p-2"> ? </span>;
    }
}