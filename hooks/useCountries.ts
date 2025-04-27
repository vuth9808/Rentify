import provinces from '@/data/provinces';

const useCountries = () => {
  const getAll = () => provinces;

  const getByValue = (value: string) => {
    return provinces.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue,
  }
};

export default useCountries; 