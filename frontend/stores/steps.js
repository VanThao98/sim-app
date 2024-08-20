// stores/steps.js
export const useStepStore = () => {
    const currentStep = useState('currentStep', () => 1);
  
    const setStep = (step) => {
      currentStep.value = step;
    };
    
    // biến trạng thái form
    const isForm = useState('isForm', () => false)
    const setIsForm = (state) => {
      isForm.value = state
    }

    return {
      currentStep,
      setStep,
      setIsForm,
      isForm
    };
  };
  