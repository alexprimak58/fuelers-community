import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import ProgressBar from "@ramonak/react-progress-bar";
import { VoteCategoriesProps } from "./CategoryToVote";
import useTheme from "../../Theme/themeContext";
import appwriteService from "../../appwrite/config";

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: 0,
  cursor: "pointer",
  transition: "background-color 0.3s, border-color 0.3s",
  "& img": {
    marginRight: "8px",
  },
}));

interface OptionsRadioProps {
  data: {
    values: number[];
    voteCategories: VoteCategoriesProps[];
  };
  optionToVote: number | null;
  setOptionToVote: React.Dispatch<React.SetStateAction<number | null>>;
  isContribution?: boolean;
}

function OptionsRadio({
  data,
  optionToVote,
  setOptionToVote,
  isContribution,
}: OptionsRadioProps) {
  const { values, voteCategories } = data;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptionToVote(Number(event.target.value));
  };
  // Sum of all the values aka numbers of votes
  const total = data.values.reduce((acc, value) => acc + value, 0);
  // Data to give to the percentage bar
  const dataToSend = values.map((value, index) => ({
    label: `Value ${index + 1}`,
    percentage: (value / total) * 100,
    value,
  }));
  // Find the max value
  const maxValue = Math.max(...values);

  // Combine voteCategories and dataToSend
  const combinedData = voteCategories.map((category, index) => ({
    category,
    ...dataToSend[index],
  }));
  //imported theme color for white theme
  const { themeColor } = useTheme();
  // console.log(combinedData);

  return (
    <div className="flex flex-col justify-between gap-[50px] w-full">
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="optionToVote"
          name={String(optionToVote)}
          value={optionToVote}
          onChange={handleChange}
        >
          {combinedData.map((item, index) => (
            <label
              className="flex gap-[10px] sm:gap-[15px] md:gap-[50px] mb-[15px] cursor-pointer"
              htmlFor={`radio-${index}`}
              key={index}
            >
              <CustomFormControlLabel
                value={index}
                control={
                  <Radio
                    id={`radio-${index}`}
                    sx={{
                      "&.MuiRadio-root": {
                        color: themeColor("white3"),
                      },
                      "&.Mui-checked": {
                        color: "#00F58C",
                      },
                    }}
                  />
                }
                label={undefined}
              />
              <div className="w-full flex flex-col aas:flex-row items-center gap-[10px] aas:gap-[50px]">
                {isContribution ? (
                  <a
                    href={item.category.document.contentlink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="w-[240px] aax:w-[270px] ax:w-[320px] aas:w-[270px] amd:w-[320px] overflow-hidden">
                      <img
                        src={appwriteService.getFilePreviewBestWorks({
                          fileId: item.category.document.image,
                        })}
                        alt="ContributionToVoteImage"
                        className="w-full rounded-[10px] border-[3px] border-solid border-defaultgreen animated-border"
                        loading="lazy"
                      />
                    </div>
                  </a>
                ) : (
                  <a
                    href={item.category.document.contentlink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="w-[180px] h-[180px] overflow-hidden ">
                      <img
                        src={appwriteService.getFilePreviewBestWorks({
                          fileId: item.category.document.image,
                        })}
                        alt="UserToVoteImage"
                        className="w-full h-full rounded-full border-[3px] border-solid border-defaultgreen animated-border"
                        loading="lazy"
                      />
                    </div>
                  </a>
                )}

                <div className="hidden ax:flex flex-col justify-center gap-[10px] w-full">
                  <p
                    className="text-1xl ax:text-2xl text-center aas:text-left aas:pl-[20px] w-full"
                    style={{ color: themeColor("white3") }}
                  >
                    Discord - <span className="text-defaultgreen">@</span>
                    {item.category.document.discordHandle}
                  </p>
                  <div
                    className="border-[1px] border-solid rounded-[21px] w-full"
                    style={{ borderColor: themeColor("white3") }}
                  >
                    <ProgressBar
                      bgColor={
                        item.value === maxValue
                          ? "#00F58C"
                          : themeColor("white3")
                      }
                      height="40px"
                      labelColor={
                        item.value === maxValue ? "#000" : themeColor("black5")
                      }
                      baseBgColor="transparent"
                      animateOnRender={true}
                      borderRadius="18px"
                      width="100%"
                      completed={item.percentage}
                      customLabel={`${item.percentage.toFixed(0)}%`}
                    />
                  </div>
                </div>
              </div>
            </label>
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default OptionsRadio;
