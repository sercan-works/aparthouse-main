import { Input, Slider } from '@heroui/react'
import React, { useState } from 'react'

const PriceSlider = () => {
  const [value, setValue] = useState([100, 500]);

  const handleSliderChange = (newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleInputChange = (index: number, inputValue: string) => {
    const newValue = parseInt(inputValue) || 0;
    const updatedValue = [...value];
    updatedValue[index] = Math.min(Math.max(newValue, 0), 1000);
    setValue(updatedValue);
  };

  return (
    <div className="flex flex-col gap-2 w-full" >
      <div className="w-full">
        <Slider
          className="max-w-md"
          value={value}
          onChange={handleSliderChange}
          label=""
          maxValue={1000}
          minValue={0}
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
          min={0}
          max={value[1]}
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
          min={value[0]}
          max={1000}
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
