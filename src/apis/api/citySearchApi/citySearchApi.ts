import authInstance from '../../utils/authInstance';

const citySearchApi = async () => {
  try {
    const { data } = await authInstance.get(
      `${import.meta.env.VITE_BE_SERVER}/main/address`,
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export { citySearchApi };
