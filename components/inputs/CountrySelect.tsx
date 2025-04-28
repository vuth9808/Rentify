'use client';

import Select from 'react-select';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange
}) => {
  const vietnamProvinces = [
    {
      flag: '🇻🇳',
      label: 'Hà Nội',
      latlng: [21.0245, 105.8412],
      region: 'Bắc Bộ',
      value: 'hanoi'
    },
    {
      flag: '🇻🇳',
      label: 'Hồ Chí Minh',
      latlng: [10.8231, 106.6297],
      region: 'Nam Bộ',
      value: 'hochiminh'
    },
    {
      flag: '🇻🇳',
      label: 'Đà Nẵng',
      latlng: [16.0544, 108.0717],
      region: 'Trung Bộ',
      value: 'danang'
    }
  ];

  return (
    <div>
      <Select
        placeholder="Chọn địa điểm"
        isClearable
        options={vietnamProvinces}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  );
}

export default CountrySelect; 