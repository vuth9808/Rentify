'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import SearchModal from '@/components/modals/SearchModal';
import RentModal from '@/components/modals/RentModal';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

const ModalProvider = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  useEffect(() => {
    // Lấy tham số modal từ URL (nếu có)
    const modal = searchParams?.get('modal');
    
    // Mở modal tương ứng dựa vào tham số
    if (modal === 'login') {
      loginModal.onOpen();
    } else if (modal === 'register') {
      registerModal.onOpen();
    }
  }, [searchParams, loginModal, registerModal]);

  return (
    <>
      <SearchModal />
      <RentModal />
      <LoginModal />
      <RegisterModal />
    </>
  );
};

export default ModalProvider; 