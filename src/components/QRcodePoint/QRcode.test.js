import React from 'react';
import QRcodePoint from './index';
import {render} from '@testing-library/react';
import { useParams } from "react-router-dom";

test('test', () => {
    render(<QRcodePoint />);
});