import models from '../models';
import { isAdmin, sendResponse } from '../utils/helperFunction';
const { Feature } = models;

export const handleFeatureAdd = async (req, res) => {
  const newFeature = new Feature({ ...req.body, userId: req.auth._id });
  try {
    const savedFeature = await newFeature.save();
    return sendResponse(res, 201, {
      name: 'OK',
      success: true,
      message: `feature id: ${savedFeature._id}`,
      savedFeature,
    });
  } catch (err) {
    return sendResponse(res, 501, {
      name: 'Internal Server Error',
      success: false,
      message: err.message,
    });
  }
};
export const getAllFeatureRequest = async (req, res) => {
  try {
    const features = await Feature.find({})
      .populate('userId', '-__v -password -email')
      .populate('comments.user', '-__v -password -email');

    if (!features.length > 0) {
      return sendResponse(res, 404, {
        name: 'NOT FOUND',
        success: false,
        message: `feature not found`,
      });
    }

    return sendResponse(res, 200, {
      name: 'OK',
      success: true,
      message: `feature found: ${features.length}`,
      features,
    });
  } catch (err) {
    return sendResponse(res, 501, {
      name: 'Internal Server Error',
      success: false,
      message: err.message,
    });
  }
};

export const handleVotes = async (req, res) => {
  const { _id, votes } = req.body;
  try {
    const updatedFeature = await Feature.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });
    if (!updatedFeature) {
      return sendResponse(res, 403, {
        name: 'Forbidden',
        success: false,
        message: 'product not found',
      });
    }
    return sendResponse(res, 200, {
      name: 'OK',
      success: true,
      message: `update data id: ${updatedFeature._id}`,
      feature: updatedFeature,
    });
  } catch (err) {
    return sendResponse(res, 500, {
      name: 'Internal Server Error',
      message: err.message,
      success: false,
    });
  }
};

export const handleComment = async (req, res) => {
  const { _id, comments } = req.body;
  try {
    const updatedFeature = await Feature.findOneAndUpdate(
      { _id },
      { comments },
      {
        new: true,
      }
    ).populate('comments.user', '-__v -password -email');
    if (!updatedFeature) {
      return sendResponse(res, 403, {
        name: 'Forbidden',
        success: false,
        message: 'product not found',
      });
    }
    return sendResponse(res, 200, {
      name: 'OK',
      success: true,
      message: `update data id: ${updatedFeature._id}`,
      feature: updatedFeature,
    });
  } catch (err) {
    return sendResponse(res, 500, {
      name: 'Internal Server Error',
      message: err.message,
      success: false,
    });
  }
};

export const featureBySearchName = async (req, res) => {
  const searchName = req.params.searchValue
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
  try {
    const features = await Feature.find({
      $or: [
        { title: new RegExp(searchName, 'i') },
        { description: new RegExp(searchName, 'i') },
      ],
    })
      .populate('comments.user', '-__v -password -email')
      .populate('userId', '-__v -password -email');

    if (!features.length) {
      return sendResponse(res, 404, {
        success: false,
        message: 'features not found by search value:' + searchName,
      });
    } else {
      return sendResponse(res, 200, {
        success: true,
        message: 'features found',
        features,
      });
    }
  } catch (err) {
    return sendResponse(res, 500, { success: false, message: err.message });
  }
};

export const changeStatus = async (req, res) => {
  const { _id, status } = req.body;

  if (!isAdmin(req)) {
    return sendResponse(res, 403, {
      name: 'denied',
      message: 'access denied',
      success: false,
    });
  }

  try {
    const updatedFeature = await Feature.findOneAndUpdate(
      { _id },
      { status },
      {
        new: true,
      }
    );
    if (!updatedFeature) {
      return sendResponse(res, 403, {
        name: 'Forbidden',
        success: false,
        message: 'feature not found',
      });
    }
    return sendResponse(res, 200, {
      name: 'OK',
      success: true,
      message: `feature update successfully!`,
      feature: updatedFeature,
    });
  } catch (err) {
    return sendResponse(res, 500, {
      name: 'Internal Server Error',
      message: err.message,
      success: false,
    });
  }
};
