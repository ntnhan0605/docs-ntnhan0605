export const uploadFileTemplate = `
  <section>
    <div class="flex items-center margin-bottom-md" style="min-height: 50px;">
      <div  style="flex: 0 0 32px; margin-right: 10px;">
        <img src="/img/icons/file_upload.svg">
      </div>
      <div class="dz-details">
        <div class="dz-filename" style="font-size: 13px"><span data-dz-name></span></div>
        <div class="dz-progress margin-y-xxxs" ><div class="dz-upload" data-dz-uploadprogress></div></div>
        <div class="dz-size" style="font-size: 12px" data-dz-size></div>
        <img data-dz-thumbnail hidden/>
      </div>

      <div class="dz-right-status padding-left-sm">
        <div class=" flex items-center">
          <div class="dz-success-mark margin-right-sm" style="width: 22px;padding-top: 5px;"><img src="/img/icons/upload_success.svg"></div>
          <div class="dz-error-mark margin-right-sm" style="width: 22px;padding-top: 5px;"><img class="fill-height" src="/img/icons/upload_error.svg"></div>
          <div><button data-dz-remove class="dz-remove-btn text-sm color-primary"> (remove)</button></div>
        </div>
      </div>
    </div>
    <div class="dz-error-message color-error" ><span data-dz-errormessage></span></div>
  </section>
`;
