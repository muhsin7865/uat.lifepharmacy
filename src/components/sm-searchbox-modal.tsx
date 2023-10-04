import ModalContainer from "./ui/modal-container";
import { Icon } from "./ui/icons";
import { Input } from "./ui/input";
import LgSearchSuggestions from "./lg-search-suggestions";
import { useModal } from "./ui/modalcontext";

export default function SmSearchBoxModal() {
  const {
    searchBoxClear,
    smScreenSearchBox,
    setSmScreenSearchBox,
    queryData,
    SearchLoadingState,
    searchButtonOnMouseEnter,
    searchData,
  } = useModal();

  return (
    <ModalContainer
      showModal={smScreenSearchBox}
      setCloseModal={setSmScreenSearchBox}
      size={"full"}
      fullModal={true}
      className="!rounded-none"
    >
      <div className="relative  w-full scale-100 transform opacity-100 transition-all ">
        <div className="relative bg-white w-full  px-2">
          <div className="flex w-full py-2 items-center space-x-4 rtl:space-x-reverse">
            <Icon
              type="chevronLeftIcon"
              className="text-black"
              sizes={"lg"}
              onClick={() => {
                setSmScreenSearchBox(false);
              }}
            />

            <Input
              id="sm-searchbox"
              defaultValue={queryData}
              ref={(input) => input && input.focus()}
              onChange={(e) => {
                searchButtonOnMouseEnter(e.target.value);
              }}
              inputClassName="bg-slate-100 py-1"
              placeholder="Search for products..."
              variant={"smallSearch"}
              sizes={"sm"}
              iconLeft={
                <Icon
                  type="searchIcon"
                  variant={"inputIconLeft"}
             
                />
              }
              iconRight={
                SearchLoadingState ? (
                  <Icon
                    type="loadingIcon"
                    sizes={"sm"}
                    animation={"spin"}
                    variant={"inputIconRight"}
                  />
                ) : (
                  <button
                    onClick={() => {
                      debugger
                      searchBoxClear();
                    }}
                  >
                    <Icon variant={"inputIconRight"} type="crossIcon" />
                  </button>
                )
              }
              rounded={"full"}
              className="border-none py-0.5"
            />
          </div>

          <LgSearchSuggestions
            searchData={searchData}
            close={setSmScreenSearchBox}
          />
        </div>
      </div>
    </ModalContainer>
  );
}
