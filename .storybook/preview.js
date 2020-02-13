import React from 'react';
import { addDecorator } from '@storybook/react';
import BootstrapProvider from '@bootstrap-styled/provider/lib/BootstrapProvider';
import { Container } from '@bootstrap-styled/v4';
import { GlobalStyle } from '../src/styles';

addDecorator(storyFn => <BootstrapProvider><GlobalStyle /><Container className="py-2">{storyFn()}</Container></BootstrapProvider>);
