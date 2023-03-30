export interface HeaterTemperatureProps {
    temperature: number;
    maxTemperature: number;
    minTemperature: number;
    onChange: (temperature: number) => void;
}
