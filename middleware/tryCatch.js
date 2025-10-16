const tryCatch = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    // only send error if nothing has been sent yet
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    } else {
      console.error("Unhandled error after response sent:", error.message);
    }
  }
};

export default tryCatch;
