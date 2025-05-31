//own code fix done this
"use client";

import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

import {
  TextInput,
  NumberInput,
  Button,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import "@mantine/dates/styles.css";
import { DatePicker } from "@mantine/dates";
import { getVendorCookiesandFetchVendor } from "@/lib/database/actions/vendor/vendor.actions";
import { createCoupon } from "@/lib/database/actions/vendor/coupon/coupon.actions";

const CreateCoupon = ({ setCoupons }: { setCoupons: any }) => {
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      const fetchVendorDetails = async () => {
        try {
          await getVendorCookiesandFetchVendor().then((res) => {
            //console.log("Vendor fetch result:", res);
            if (res.success) {
              setVendor(res.vendor);
              setLoading(false);
            }
          });
        } catch (error: any) {
          console.error("Error fetching vendor:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchVendorDetails();
    } catch (error: any) {
      console.error("Unexpected error in useEffect:", error);
    }
  }, []);

  const form = useForm({
    initialValues: {
      name: "",
      discount: 0,
      dateRange: [null, null] as [Date | null, Date | null],
    },
    validate: {
      name: (value) =>
        value.length < 5 || value.length > 10
          ? "Coupon name must be between 5 to 10 characters."
          : null,
      discount: (value) =>
        value < 1 || value > 99 ? "Discount must be between 1% to 99%." : null,
      dateRange: ([startDate, endDate]) => {
        if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
          return "Both start and end dates are required.";
        }
        if (startDate.getTime() === endDate.getTime()) {
          return "You can't pick same dates!";
        }
        if (endDate.getTime() < startDate.getTime()) {
          return "Start Date cannot be later than End Date!";
        }
        return null;
      },
    },
  });

  const submitHandler = async (values: typeof form.values) => {
    //console.log("Submit handler triggered with values:", values);

    setLoading(true);
    const [startDate, endDate] = values.dateRange;

    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      alert("Please select a valid start and end date.");
      setLoading(false);
      return;
    }

    if (!vendor?._id) {
      alert("Vendor data is missing. Please refresh.");
      setLoading(false);
      return;
    }

    try {
      console.log("Calling createCoupon API");
      const res = await createCoupon(
        values.name,
        values.discount,
        startDate,
        endDate,
        vendor._id
      );
      console.log("createCoupon response:", res);

      if (res?.success) {
        setCoupons(res?.coupon);
        form.reset();
        alert(res?.message);
      } else {
        alert(res?.message);
      }
    } catch (error) {
      console.error("Error in createCoupon call:", error);
      alert("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box pos={"relative"}>
        {loading && (
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
        )}
        <form onSubmit={form.onSubmit(submitHandler)}>
          <div className="titleStyle">Create a Coupon</div>

          <TextInput
            label="name"
            placeholder="Coupon name"
            {...form.getInputProps("name")}
          />
          {form.errors.name && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {form.errors.name}
            </div>
          )}

          <NumberInput
            label="Discount"
            placeholder="Discount"
            {...form.getInputProps("discount")}
            min={1}
            max={99}
          />
          {form.errors.discount && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {form.errors.discount}
            </div>
          )}

          <DatePicker
            type="range"
            value={form.values.dateRange}
            minDate={new Date()}
            onChange={(val) => {
              if (Array.isArray(val)) {
                // Convert string dates to Date objects, or keep nulls
                const dateRange: [Date | null, Date | null] = [
                  val[0] ? new Date(val[0]) : null,
                  val[1] ? new Date(val[1]) : null,
                ];
                form.setFieldValue("dateRange", dateRange);
              } else {
                form.setFieldValue("dateRange", [null, null]);
              }
            }}
          />
          {form.errors.dateRange && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {form.errors.dateRange}
            </div>
          )}

          <Button type="submit" disabled={loading}>
            Add Coupon
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default CreateCoupon;
