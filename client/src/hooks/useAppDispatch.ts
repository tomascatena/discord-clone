import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';

// Export a hook that can be reused to resolve types
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
