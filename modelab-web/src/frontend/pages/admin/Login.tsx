import * as React from 'react';
import { useTitle, useTranslation } from '../../../libs/hooks';
import { Header, Preloader } from '../../../libs/ui/components';
import { GridBackgroundContainer } from '../../../libs/ui/components/GridBackgroundContainer';

const Login: React.FC = () => {
  const t = useTranslation('admin.login');
  useTitle({ type: 'empty' });

  return (
    <React.Suspense fallback={<Preloader />}>
      <Header className={'h-[8vh] w-full'} />
      <main>
        <GridBackgroundContainer className="flex flex-col items-center overflow-hidden justify-between h-[92vh]">
          <p>{t('greetings')}</p>
        </GridBackgroundContainer>
      </main>
    </React.Suspense>
  );
};

export default Login;
