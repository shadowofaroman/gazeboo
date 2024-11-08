import React, { useState } from 'react';
import { Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, TextField, Box, Button } from '@mui/material';

const ProductConfiguration = () => {
  // State for configuration options
  const [roofType, setRoofType] = useState('');
  const [screenType, setScreenType] = useState('');
  const [controlType, setControlType] = useState('');
  const [additionalFeatures, setAdditionalFeatures] = useState({
    blinds: false,
    lighting: false,
  });
  const [length, setLength] = useState(0);  // Length in meters
  const [projection, setProjection] = useState(0);  // Projection in meters
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  // Pricing per feature in KES
  const pricing = {
    roofType: {
      polycarbonate: 3000,
      glass: 5000,
    },
    screenType: {
      fixed: 1500,
      louvered: 3000,
    },
    controlType: {
      manual: 500,
      remote: 1000,
    },
    additionalFeatures: {
      blinds: 2000,
      lighting: 1000,
    }
  };

  // Handlers for each selection
  const handleRoofTypeChange = (event) => setRoofType(event.target.value);
  const handleScreenTypeChange = (event) => setScreenType(event.target.value);
  const handleControlTypeChange = (event) => setControlType(event.target.value);
  const handleFeatureChange = (event) => {
    setAdditionalFeatures({
      ...additionalFeatures,
      [event.target.name]: event.target.checked,
    });
  };

  // Calculate price based on selections
  const calculatePrice = () => {
    const area = length * projection;
    let total = 0;

    // Roof Type price calculation
    if (roofType) {
      total += area * pricing.roofType[roofType];
    }

    // Screen Type price
    if (screenType) {
      total += pricing.screenType[screenType];
    }

    // Control Type price
    if (controlType) {
      total += pricing.controlType[controlType];
    }

    // Additional Features price
    if (additionalFeatures.blinds) {
      total += pricing.additionalFeatures.blinds;
    }
    if (additionalFeatures.lighting) {
      total += pricing.additionalFeatures.lighting;
    }

    // Set calculated price in KES
    setCalculatedPrice(total);
  };

  // Save Details Handler
  const handleSaveDetails = () => {
    if (!roofType) {
      alert("Please select a roof type before saving.");
      return;
    }

    const configurationDetails = {
      roofType,
      screenType,
      controlType,
      additionalFeatures,
      length,
      projection,
      calculatedPrice,
    };

    console.log("Configuration Details:", configurationDetails);
    alert("Details saved successfully!");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Product Configuration</Typography>

      {/* Roof Type Selection */}
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">Roof Type</FormLabel>
        <RadioGroup value={roofType} onChange={handleRoofTypeChange}>
          <FormControlLabel value="polycarbonate" control={<Radio />} label="Polycarbonate" />
          <FormControlLabel value="glass" control={<Radio />} label="Glass" />
          <FormControlLabel value="louvred" control={<Radio />} label="Louvred" />
        </RadioGroup>
      </FormControl>

      {/* Length and Projection Inputs */}
      <TextField
        label="Length (meters)"
        type="number"
        value={length}
        onChange={(e) => {
          const newValue = parseFloat(e.target.value);
          if (!isNaN(newValue) && newValue >= 1) {
            setLength(newValue); 
          } else if (e.target.value === "") {
            setLength(""); 
          }
        }}
        sx={{ mt: 2, mr: 2 }}
        inputProps={{ min: 0 }}
      />
      <TextField
        label="Projection (meters)"
        type="number"
        value={projection}
        onChange={(e) => {
          const newValue = parseFloat(e.target.value);
          if (!isNaN(newValue) && newValue >= 1) {
            setProjection(newValue);
          } else if (e.target.value === "") {
            setProjection("");
          }
        }}
        sx={{ mt: 2 }}
        inputProps={{ min: 0 }}
      />

      {/* Screen Type Selection */}
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">Screen Type</FormLabel>
        <RadioGroup value={screenType} onChange={handleScreenTypeChange}>
          <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
          <FormControlLabel value="louvered" control={<Radio />} label="Louvered" />
        </RadioGroup>
      </FormControl>

      {/* Control Type Selection */}
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">Control Type</FormLabel>
        <RadioGroup value={controlType} onChange={handleControlTypeChange}>
          <FormControlLabel value="manual" control={<Radio />} label="Manual" />
          <FormControlLabel value="remote" control={<Radio />} label="Remote" />
        </RadioGroup>
      </FormControl>

      {/* Additional Features */}
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">Additional Features</FormLabel>
        <FormControlLabel
          control={<Checkbox checked={additionalFeatures.blinds} onChange={handleFeatureChange} name="blinds" />}
          label="Blinds"
        />
        <FormControlLabel
          control={<Checkbox checked={additionalFeatures.lighting} onChange={handleFeatureChange} name="lighting" />}
          label="Lighting"
        />
      </FormControl>

      {/* Calculate Price Button */}
      <Button onClick={calculatePrice} variant="contained" sx={{ mt: 2 }}>
        Calculate Price
      </Button>
      
      {/* Display Calculated Price */}
      <Typography sx={{ mt: 2 }}>
        Total Price: {calculatedPrice} KES
      </Typography>

      {/* Save Details Button */}
      <Button onClick={handleSaveDetails} variant="contained" color="primary" sx={{ mt: 2 }}>
        Save Details
      </Button>
    </Box>
  );
};

export default ProductConfiguration;
