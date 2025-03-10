import { CodeXml, Copy, Loader2, Save, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  CompilerSliceStateType,
  updateCurrentLanguage,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useSaveCodeMutation } from "@/redux/slices/api";



export default function HelperHeader() {
  //const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const navigate = useNavigate();

  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const [saveCode, { isLoading }] = useSaveCodeMutation();

  const { urlId } = useParams();
  useEffect(() => {
    setShareBtn(!!urlId);
  }, [urlId]);
  
  const handleSaveCode = async () => {
    // setSaveLoading(true);
    try {
      const response = await saveCode(fullCode).unwrap();
      console.log(response);
      navigate(`/compiler/${response.url}`, { replace: true });
    } catch (error) {
      handleError(error);
    } finally {
      //setSaveLoading(false);
    }
  };

  const dispatch = useDispatch();
  const currentLangauge = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  return (
    <div className=" __helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
      <div className=" __btn_comtainer flex gap-2">
        <Button
          onClick={handleSaveCode}
          className="flex justify-center items-center gap-1"
          variant="success"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              {" "}
              <Loader2 className="animate-spin" />
              Saving
            </>
          ) : (
            <>
              {" "}
              <Save size={16} />
              Save
            </>
          )}
        </Button>

        {shareBtn && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="flex justify-center items-center gap-1"
                variant="secondary"
              >
                <Share2 size={16} />
                Share
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className=" flex gap-1 justify-center items-center">
                  <CodeXml />
                  Share your code
                </DialogTitle>
                <DialogDescription className="flex flex-col gap-2">
                  <div className="__url flex gap-1">
                    <input
                      type="text"
                      disabled
                      className="text-center w-full px-2 py-2 rounded bg-slate-700 text-slate-300 select-none"
                      value={window.location.href}
                    />
                    <Button
                      variant="success"
                      className="text-slate-200"
                      onClick={() => {
                        window.navigator.clipboard.writeText(
                          window.location.href
                        );
                        toast("URL Copied to your clipboard !!");
                      }}
                    >
                      <Copy size={15} />
                    </Button>
                  </div>

                  <p className=" text-center">
                    Share your code easily with a unique link, anyone with the
                    link can view it in the editor !!
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="__tab_switcher flex justify-center items-center gap-1">
        {/* <small>Current Language :</small> */}
        <Select
          defaultValue={currentLangauge}
          onValueChange={(value) =>
            dispatch(
              updateCurrentLanguage(
                value as CompilerSliceStateType["currentLanguage"]
              )
            )
          }
        >
          <SelectTrigger className="w-[115px] bg-gray-800 outline-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
        