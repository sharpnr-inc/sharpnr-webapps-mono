// this is component which refractor the Address Section
// This Takes the

import {
  useCitiesOfState,
  useCountries,
  useStateOfCountries,
} from "@/apis/Queries";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NewSearchableSelect } from "@/signup_and_auth/NewLocationDropdown";
import { useState } from "react";

export type AddressFields = {
  addressLine: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

type Props = {
  form: any;
};

export function AddressSection({ form }: Props) {
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");

  const {
    data: countryList,
    isFetching: isCountryFetching,
    isError: isCountryError,
  } = useCountries();

  const {
    data: stateList,
    isFetching: isStateFetching,
    isError: isStateError,
  } = useStateOfCountries(countryCode);

  const {
    data: citiesList,
    isPending: isCityPending,
    isError: isCityError,
  } = useCitiesOfState(countryCode, stateCode);

  const allCountryList = countryList?.data ?? [];
  const allStates = stateList?.data ?? [];
  const allCities = citiesList?.data ?? [];

  return (
     <>
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Country */}
        <form.Field
          name="country"
          validators={{
            onChange: ({ value }) =>
              !value ? "Please select a country" : undefined,
          }}
        >
          {(field) => (
            <Field>
              <FieldLabel>Country</FieldLabel>

              {isCountryError ? (
                <Alert variant="destructive">
                  <AlertDescription>
                    Failed to load countries
                  </AlertDescription>
                </Alert>
              ) : (
                <NewSearchableSelect
                  value={countryCode}
                  options={allCountryList}
                  placeholder={
                    isCountryFetching
                      ? "Loading countries..."
                      : "Select country"
                  }
                  getValue={(c) => c.iso2}
                  getLabel={(c) => c.name}
                  getMainValue={(c) => c.name}
                  onChange={(value, _, country) => {
                    setCountryCode(value)

                    field.handleChange(country)

                    // reset dependent fields
                    setStateCode("")
                    form.setFieldValue("state", "")
                    form.setFieldValue("city", "")
                  }}
                  disabled={isCountryFetching}
                />
              )}

              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors[0]}</FieldError>
                )}
            </Field>
          )}
        </form.Field>

        {/* State */}
        <form.Field
          name="state"
          validators={{
            onChange: ({ value }) =>
              !value ? "Please select a state" : undefined,
          }}
        >
          {(field) => (
            <Field>
              <FieldLabel>State</FieldLabel>

              {isStateError ? (
                <Alert variant="destructive">
                  <AlertDescription>
                    Failed to load states
                  </AlertDescription>
                </Alert>
              ) : (
                <NewSearchableSelect
                  value={stateCode}
                  options={allStates}
                  placeholder={
                    isStateFetching ? "Loading states..." : "Select state"
                  }
                  getValue={(s) => s.iso2}
                  getLabel={(s) => s.name}
                  getMainValue={(s) => s.name}
                  onChange={(value, _, state) => {
                    setStateCode(value)
                    field.handleChange(state)
                    form.setFieldValue("city", "")
                  }}
                  disabled={!countryCode || isStateFetching}
                />
              )}

              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors[0]}</FieldError>
                )}
            </Field>
          )}
        </form.Field>

        {/* City */}
        <form.Field
          name="city"
          validators={{
            onChange: ({ value }) =>
              !value ? "Please select a city" : undefined,
          }}
        >
          {(field) => (
            <Field>
              <FieldLabel>City</FieldLabel>

              {isCityError ? (
                <Alert variant="destructive">
                  <AlertDescription>
                    Failed to load cities
                  </AlertDescription>
                </Alert>
              ) : (
                <NewSearchableSelect
                  value={field.state.value}
                  options={allCities}
                  placeholder={
                    isCityPending ? "Loading cities..." : "Select city"
                  }
                  getValue={(c) => c.id}
                  getLabel={(c) => c.name}
                  getMainValue={(c) => c.name}
                  onChange={(_, __, city) => {
                    field.handleChange(city)
                  }}
                  disabled={!stateCode || isCityPending}
                />
              )}

              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors[0]}</FieldError>
                )}
            </Field>
          )}
        </form.Field>

        {/* Pincode */}
        <form.Field
          name="pincode"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Pincode is required"
              if (!/^\d{5,6}$/.test(value))
                return "Enter a valid 5-6 digit pincode"
              return undefined
            },
          }}
        >
          {(field) => (
            <Field>
              <FieldLabel>Pincode</FieldLabel>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
                  <FieldError>{field.state.meta.errors[0]}</FieldError>
                )}
            </Field>
          )}
        </form.Field>
      </div>

      {/* Address line */}
      <form.Field
        name="address_line"
        validators={{
          onChange: ({ value }) =>
            !value || value.length < 10
              ? "Address must be at least 10 characters"
              : undefined,
        }}
      >
        {(field) => (
          <Field>
            <FieldLabel>Full Address</FieldLabel>
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <FieldError>{field.state.meta.errors[0]}</FieldError>
              )}
          </Field>
        )}
      </form.Field>
    </>
  );
}
