//own code fix done this
"use server";

import { connectToDatabase } from "@/lib/database/connect";
import Coupon from "@/lib/database/models/coupon.model";
import Vendor from "@/lib/database/models/vendor.model";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

// Helper to convert ObjectIds to strings recursively in coupon objects
function convertCouponObjectIds(coupon: any) {
  return {
    ...coupon,
    _id: coupon._id.toString(),
    vendor: coupon.vendor
      ? {
          ...coupon.vendor,
          _id: coupon.vendor._id.toString(),
        }
      : null,
    // Add any other ObjectId fields here if needed
  };
}

// create a coupon for vendor
export const createCoupon = async (
  coupon: string,
  discount: number,
  startDate: any,
  endDate: any,
  vendorId: string
) => {
  try {
    await connectToDatabase();

    const vendor = await Vendor.findById(vendorId).lean();
    if (!vendor) {
      return {
        message: "Vendor Id is invalid!",
        success: false,
      };
    }
    const test = await Coupon.findOne({ coupon }).lean();
    if (test) {
      return {
        message: "Coupon already exists, try a different coupon name.",
        success: false,
      };
    }
    await new Coupon({
      coupon,
      discount,
      startDate,
      endDate,
      vendor,
    }).save();

    const vendorCoupons = await Coupon.find({
      "vendor._id": vendorId,
    })
      .lean()
      .sort({
        updatedAt: -1,
      });

    const plainCoupons = vendorCoupons.map(convertCouponObjectIds);

    return {
      message: `Coupon ${coupon} has been successfully created.`,
      coupon: plainCoupons,
      success: true,
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: "Error creating coupon.",
      success: false,
    };
  }
};

// delete coupon for vendor
export const deleteCoupon = async (couponId: string, vendorId: string) => {
  try {
    await connectToDatabase();
    const vendorObjectId = new ObjectId(vendorId);

    const coupon = await Coupon.findByIdAndDelete(couponId);
    if (!coupon) {
      return {
        message: "No Coupon found with this Id!",
        success: false,
      };
    }
    const vendor = await Vendor.findById(vendorObjectId).lean();
    if (!vendor) {
      return {
        message: "Vendor Id is invalid!",
        success: false,
      };
    }
    const vendorCoupons = await Coupon.find({
      "vendor._id": vendorObjectId,
    })
      .lean()
      .sort({
        updatedAt: -1,
      });

    const plainCoupons = vendorCoupons.map(convertCouponObjectIds);

    return {
      message: "Successfully deleted!",
      coupons: plainCoupons,
      success: true,
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: "Error deleting coupon.",
      success: false,
    };
  }
};

// update coupon for vendor
export const updateCoupon = async (
  coupon: string,
  couponId: string,
  discount: number,
  startDate: any,
  endDate: any,
  vendorId: string
) => {
  try {
    await connectToDatabase();
    const vendorObjectId = new ObjectId(vendorId);

    const foundCoupon = await Coupon.findByIdAndUpdate(couponId, {
      coupon,
      discount,
      startDate,
      endDate,
    });
    if (!foundCoupon) {
      return {
        message: "No Coupon found with this Id.",
        success: false,
      };
    }
    const vendorCoupons = await Coupon.find({
      "vendor._id": vendorObjectId,
    })
      .lean()
      .sort({
        updatedAt: -1,
      });

    const plainCoupons = vendorCoupons.map(convertCouponObjectIds);

    return {
      message: "Successfully updated!",
      coupons: plainCoupons,
      success: true,
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: "Error updating coupon.",
      success: false,
    };
  }
};

// get all coupons for vendor
export const getAllCoupons = async (vendorId: string) => {
  try {
    await connectToDatabase();

    const vendorObjectId = new ObjectId(vendorId);
    const coupons = await Coupon.find({ "vendor._id": vendorObjectId })
      .lean()
      .sort({ updatedAt: -1 });

    if (!coupons || coupons.length === 0) {
      return {
        message: "No Vendor or created vendor coupon found with this Id!",
        success: false,
      };
    }

    const plainCoupons = coupons.map(convertCouponObjectIds);

    return {
      coupons: plainCoupons,
      message: "Successfully fetched vendor coupons",
      success: true,
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: "Error fetching coupons.",
      success: false,
    };
  }
};
