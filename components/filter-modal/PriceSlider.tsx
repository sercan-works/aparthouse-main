import { Input, Slider } from '@heroui/react'
import React, { useState, useEffect } from 'react'

interface PriceSliderProps {
  min?: number;
  max?: number;
  onChange?: (values: number[]) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({ 
  min = 0, 
  max = 1000,
  onChange
}) => {
  const [value, setValue] = useState([min, max/2]);

  useEffect(() => {
    // Başlangıç değerini props'lardan güncelle
    setValue([min, max/2]);
  }, [min, max]);

  const handleSliderChange = (newValue: number | number[]) => {
    const values = newValue as number[];
    setValue(values);
    onChange?.(values);
  };

  const handleInputChange = (index: number, inputValue: string) => {
    const newValue = parseInt(inputValue) || 0;
    const updatedValue = [...value];
    updatedValue[index] = Math.min(Math.max(newValue, min), max);
    setValue(updatedValue);
    onChange?.(updatedValue);
  };

  return (
    <div className="flex flex-col gap-2 w-full" >
      <div className="w-full">
        <Slider
          className="max-w-md"
          value={value}
          onChange={handleSliderChange}
          label=""
          maxValue={max}
          minValue={min}
          step={50}
          size="sm"
          color="primary"
        />
      </div>
      
      <div className="flex justify-around gap-4 mt-4 ">
        <Input
          type="number" 
          value={value[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
          min={min.toString()}
          max={value[1].toString()}
          placeholder="Min"
          size="lg"
          className="w-64"
          variant="bordered"
          labelPlacement='inside'
          label="Min"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-lg">₺</span>
            </div>  
          }
        />
        <Input
          type="number"
          value={value[1]} 
          onChange={(e) => handleInputChange(1, e.target.value)}
          min={value[0].toString()}
          max={max.toString()}
          placeholder="Max"
          size="lg"
          className="w-64"
          variant="bordered"
          labelPlacement='inside'
          label="Max"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-lg">₺</span>
            </div>  
          }
        />
      </div>
    </div>
  )
}

export default PriceSlider
