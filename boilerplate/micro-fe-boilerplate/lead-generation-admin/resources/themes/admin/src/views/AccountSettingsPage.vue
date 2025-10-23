<template>
  <div class="le-page le-no-padding-top fill-height">
    <div>
      <div class="le-fixed-topnav">
        <div class="height-100% flex items-center justify-between padding-x-xl">
          <!-- Left nav -->
          <div class="text-lg font-normal">
            <span>Settings</span>
            <v-icon class="margin-x-xxxs" color="black">mdi-chevron-right</v-icon>
            <span v-show="step == 'details'">
              <span class="color-primary">Personal Details</span>
            </span>
            <span v-show="step == 'pass'">
              <span class="color-primary">Change password</span>
            </span>
            <span v-show="step == 'user'">
              <span :class="{'color-primary': !isShowAddUser}">Manage users</span>
              <span v-show="isShowAddUser">
                <v-icon class="margin-x-xxxs" color="black">mdi-chevron-right</v-icon>
                <span class="color-primary">{{ editUserID ? 'User Settings' : 'New User' }}</span>
              </span>
            </span>
            <span v-show="step == 'clients'">
              <span :class="{'color-primary': !isShowAddClient}">Manage clients</span>
              <span v-show="isShowAddClient">
                <v-icon class="margin-x-xxxs" color="black">mdi-chevron-right</v-icon>
                <span class="color-primary">{{ editClientID ? 'Client Settings' : 'New Client' }}</span>
              </span>
            </span>
          </div>

          <!-- Right nav -->
          <div>
            <nav v-show="step == 'user' && !isShowAddUser">
              <div class="flex items-center justify-space-between width-100%">
                <div class="mr-1">
                  <input @input="debouceGetListUser" v-model="filterData.navSeachUser" placeholder="Search user name" class="le-top-search" type="text" />
                </div>
                <button class="le-button-search mr-3">
                  <v-icon @click="fetchUsers" class="text-md adding-bottom-xxxxs" color="white">mdi-magnify</v-icon>
                </button>

                <button class="le-button padding-x-md" @click="isShowAddUser = true; filterData.searchClient = '';">
                  <v-icon class="text-md padding-bottom-xxxxs margin-right-xxs" color="white">mdi-plus</v-icon>New User
                </button>
              </div>
            </nav>

            <nav v-show="step == 'clients' && !isShowAddClient">
              <div class="flex justify-space-between width-100%">
                <div class="mr-1">
                  <input @input="debouceGetListClient" v-model="filterData.navSeachClient" placeholder="Search client name" class="le-top-search" type="text" />
                </div>
                <button class="le-button-search mr-3">
                  <v-icon @click="fetchClients" class="text-md adding-bottom-xxxxs" color="white">mdi-magnify</v-icon>
                </button>

                <button @click="isShowAddClient = !isShowAddClient, editClientID = 0" class="le-button padding-x-md">
                  <v-icon class="text-md padding-bottom-xxxxs margin-right-xxs" color="white">mdi-plus</v-icon>New Client
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div class="flex">
        <div style="background: #f8f8f8; min-height: calc(100vh - 32px); min-width: 240px;" class="padding-left-xl padding-top-xxxl le-color-black">
          <div class="margin-top-xxl"></div>
          <p @click="setStep('details')" class="text-15 cursor-pointer" :class="{'color-primary': (step == 'details')}">Personal details</p>
          <p @click="setStep('pass')" class="text-15 cursor-pointer" :class="{'color-primary': (step == 'pass')}">Change password</p>
          <p v-if="isAdminRole" @click="setStep('user')" class="text-15 cursor-pointer" :class="{'color-primary': (step == 'user')}">Manage users</p>
          <p v-if="isAdminRole" @click="setStep('clients')" class="text-15 cursor-pointer" :class="{'color-primary': (step == 'clients')}">Manage clients</p>
        </div>
        <div class="padding-x-xxxl padding-top-xxxl width-100% le-color-black">
          <div class="padding-top-sm" v-show="step == 'details'">
            <h1 class="margin-bottom-md"></h1>
            <div class="flex">
              <div style="min-width: 400px;" class="margin-right-xxxxl">
                <div>First name</div>
                <v-text-field ref="le-firstname" type="text" v-model="user.first_name" class="margin-top-xs margin-bottom-md" autofocus placeholder=" " hide-details outlined spellcheck="false" autocomplete="new-password"></v-text-field>
                <div>Last name</div>
                <v-text-field ref="le-lastname" type="text" v-model="user.last_name" class="margin-top-xs margin-bottom-md" placeholder=" " hide-details outlined spellcheck="false" autocomplete="new-password"></v-text-field>
                <div>Email</div>
                <v-text-field :value="userData.email" class="margin-top-xs margin-bottom-md" disabled hide-details outlined></v-text-field>
                <div>Role</div>
                <v-text-field :value="getRoleName(userData.roles[0].name)" class="margin-top-xs margin-bottom-md" disabled hide-details outlined></v-text-field>
                <div class="padding-top-lg">
                  <button @click="saveUpdateDetails" class="le-button font-semibold padding-x-md">Save changes</button>
                </div>
              </div>
              <aside class="padding-top-lg">
                <div class="relative" style="width: 175px;height: 175px;">
                  <div style="width: 100%;height: 100%;background: #f8f8f8;border-radius: 50%;border: solid 1px #e1e1e1;" class="flex justify-center items-center cursor-pointer">
                    <span class="text-sm color-primary">Upload new image</span>
                  </div>
                  <img v-show="imgAvatar" :src="imgAvatar" style="width: 100%;height: 100%;object-fit: cover;border-radius: 50%; top:0; left:0;object-position: top;" class="absolute" alt />
                  <input id="le-avatar-uploader" @change="readURL($event, 'imgAvatar')" type="file" accept="image/*" class="absolute cursor-pointer" style="top:0;left:0; width: 100%; height: 100%; opacity: 0" />
                  <div v-if="imgAvatar" class="absolute flex justify-center items-center le-backdrop-hover text-15" style="width: 100%;height: 100%;border-radius: 50%;top:0; left:0;">
                    <div class="cursor-pointer text-16" v-tooltip="{
                    trigger: 'click',
                    content: `
                      <div class='padding-sm le-tooltip-menu'>
                        <div id='le-avatar-remove' class='le-item'>Remove image</div>
                        <div id='le-avatar-upload' class='le-item'>Upload new image</div>
                      </div>
                    `}">
                      <v-icon class="text-md margin-right-xxxs" color="white">mdi-pencil</v-icon>Edit
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          <div class="padding-top-sm" v-show="step == 'pass'" style="max-width: 400px;">
            <h1 class="margin-bottom-md"></h1>
            <div>Current password</div>
            <v-text-field :append-icon="isShowCurrentPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="isShowCurrentPass = !isShowCurrentPass" :type="isShowCurrentPass ? 'text' : 'password'" v-model="current_password" class="margin-top-xs margin-bottom-md" autofocus hide-details outlined spellcheck="false"></v-text-field>
            <div>New password</div>
            <v-text-field :append-icon="isShowRePass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="isShowRePass = !isShowRePass" :type="isShowRePass ? 'text' : 'password'" v-model="password" class="margin-top-xs margin-bottom-md" hide-details outlined spellcheck="false"></v-text-field>
            <div>Re-type password</div>
            <v-text-field :append-icon="isShowRePass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="isShowRePass = !isShowRePass" :type="isShowRePass ? 'text' : 'password'" v-model="password_confirmation" class="margin-top-xs margin-bottom-md" hide-details outlined spellcheck="false"></v-text-field>
            <div class="padding-top-lg">
              <button @click="changePassword" class="le-button font-semibold padding-x-md">Save changes</button>
            </div>
          </div>

          <div v-show="step == 'user'">
            <div class="margin-top-xl" v-if="isShowAddUser">
              <v-tabs>
                <v-tab>USER PROFILE</v-tab>
                <v-tab>SITES & CLIENTS</v-tab>
                <!-- USER PROFILE tab -->
                <v-tab-item>
                  <div class="d-flex margin-top-lg">
                    <form style="flex: 0 0 330px;" class="relative mt-5 animate__animated animate__fadeIn">
                      <div class="items-center">
                        <div class="font-semibold">
                          First Name
                          <span class="color-error">*</span>
                        </div>
                        <v-text-field v-model="editUser.first_name" required autofocus name="add-firstname" ref="le-add-firstname" type="text" class="margin-top-xs margin-bottom-md" placeholder=" " hide-details outlined spellcheck="false" autocomplete="new-password"></v-text-field>
                      </div>
                      <div class="items-center">
                        <div class="font-semibold">Last Name</div>
                        <v-text-field v-model="editUser.last_name" required name="add-lastname" ref="le-add-lastname" type="text" class="margin-top-xs margin-bottom-md" placeholder=" " hide-details outlined spellcheck="false" autocomplete="new-password"></v-text-field>
                      </div>
                      <div class="items-center">
                        <div class="font-semibold">
                          Email
                          <span class="color-error">*</span>
                        </div>
                        <v-text-field :disabled="!!editUserID" :title="editUser.email" v-model="editUser.email" required name="add-email" ref="le-add-email" type="email" class="margin-top-xs margin-bottom-md" placeholder=" " hide-details outlined spellcheck="false" autocomplete="new-password"></v-text-field>
                      </div>
                      <div class="items-start margin-top-sm">
                        <div class="font-semibold">
                          Role
                          <span class="color-error">*</span>
                        </div>
                        <div class="margin-top-md">
                          <LeRadio v-for="(n,idx) in listRoleEditPopup" v-model="editUser.role_id" :key="'addRoleID-' + idx" class="block margin-bottom-md text-base font-semibold text-capitalize" name="userAddRole" :checkValue="n.id" :checked="((n.id == editUser.role_id))">
                            <div>
                              <div>{{n.display_name}}</div>
                              <div class="text-14 font-light" style="color: #c0c0c0;">{{ n.description }}</div>
                            </div>
                          </LeRadio>
                        </div>
                      </div>
                    </form>

                    <div class="width-100% padding-left-xl">
                      <div style="max-width: 500px;">
                        <div class="d-flex items-center justify-center">
                          <div :class="{'font-bold': !editUser.status }" class="mr-4 text-sm">Inactive</div>
                          <v-switch class="le-switch-inset" :ripple="false" v-model="editUser.status" inset></v-switch>
                          <div :class="{'font-bold': editUser.status }" class="text-sm">Active</div>
                        </div>
                        <aside class="padding-top-lg">
                          <div class="relative margin-auto" style="width: 175px;height: 175px;">
                            <div style="width: 100%;height: 100%;background: #f8f8f8;border-radius: 50%;border: solid 1px #e1e1e1;" class="flex justify-center items-center cursor-pointer">
                              <span class="text-sm color-primary">Upload new image</span>
                            </div>
                            <img v-show="editUser.avatar" :src="editUser.avatar" style="width: 100%;height: 100%;object-fit: cover;border-radius: 50%; top:0; left:0;object-position: top;" class="absolute" alt />
                            <input id="le-avatar-user-uploader" @change="readURL($event, 'editUser.avatar')" type="file" accept="image/*" class="absolute cursor-pointer" style="top:0;left:0; width: 100%; height: 100%; opacity: 0" />
                            <div v-if="editUser.avatar" class="absolute flex justify-center items-center le-backdrop-hover text-15" style="width: 100%;height: 100%;border-radius: 50%;top:0; left:0;">
                              <div class="cursor-pointer text-16" v-tooltip="{
                                trigger: 'click',
                                content: `
                                  <div class='padding-sm le-tooltip-menu'>
                                    <div id='le-avatar-user-remove' class='le-item'>Remove image</div>
                                    <div id='le-avatar-user-upload' class='le-item'>Upload new image</div>
                                  </div>
                                `}">
                                <v-icon class="text-md margin-right-xxxs" color="white">mdi-pencil</v-icon>Edit
                              </div>
                            </div>
                          </div>
                        </aside>
                      </div>
                    </div>
                  </div>
                </v-tab-item>

                <!-- SITES & CLIENTS tab -->
                <v-tab-item>
                  <section style="max-width: 980px;" class="d-flex margin-top-xl">
                    <div style="flex: 0 0 350px;">
                      <div class="font-semibold margin-bottom-xl">
                        Sites
                        <span class="color-error">*</span>
                      </div>
                      <div class>
                        <v-checkbox :ripple="false" :input-value="editUser.site_ids && editUser.site_ids.length == listSite.length" @change="toggleCheckAll([...arguments, 'listSite','id', editUser, 'site_ids'])" class="le-checkbox-site" label="All" hide-details></v-checkbox>
                        <v-checkbox :ripple="false" class="le-checkbox-site" v-for="site in listSite" :key="'user-site-' + site.id" v-model="editUser.site_ids" :value="site.id" hide-details>
                          <template v-slot:label>
                            <div class="d-flex items-center">
                              <div style="flex: 0 0 200px;" class>{{ site.description }}</div>
                              <img v-if="site.country_id" width="28" :src="'/img/country/square/'+ site.country_id + '.png'" alt />
                            </div>
                          </template>
                        </v-checkbox>
                      </div>
                    </div>
                    <div class="width-100%">
                      <div class="flex justify-between items-start">
                        <div class="font-semibold margin-bottom-xl">
                          Clients
                          <span class="color-error">*</span>
                          <v-icon class="ml-1" title="Click to add new client" @click="openAddNewClient" color="primary">mdi-plus</v-icon>
                        </div>

                        <div class>
                          <div class="flex le-search-client">
                            <v-icon class color="black">mdi-magnify</v-icon>
                            <input v-model="filterData.searchClient" class="ml-2" type="text" placeholder="Search client" />
                          </div>
                        </div>
                      </div>
                      <div v-show="listClientBySite && listClientBySite.length" class="le-mini-scrollbar" style="height: 495px; overflow: auto;">
                        <v-checkbox :ripple="false" :input-value="editUser.client_ids && editUser.client_ids.length == listClientBySite.length" @change="toggleCheckAll([...arguments, 'listClientBySite','id', editUser, 'client_ids'])" class="le-checkbox-site le-checkbok-table" label="All" hide-details></v-checkbox>
                        <v-checkbox :ripple="false" class="le-checkbox-site le-checkbok-table" v-for="site in listClientBySite" :key="'user-client-' + site.id" v-model="editUser.client_ids" :value="site.id" hide-details>
                          <template v-slot:label>
                            <div class="d-flex items-center">
                              <div style="flex: 0 0 200px;" class>{{ site.name }}</div>
                            </div>
                          </template>
                        </v-checkbox>
                      </div>
                      <div v-show="!listClientBySite.length">No clients found.</div>
                    </div>
                  </section>
                </v-tab-item>
              </v-tabs>
              <div style="max-width: 980px;">
                <div class="margin-y-xxl d-flex justify-end">
                  <button type="button" @click="isShowAddUser = false, resetEditUser()" class="le-button padding-x-md margin-right-md">CANCEL</button>
                  <button @click="callApiUser" :disabled="!isValidAddUser" type="submit" class="le-button padding-x-md le-button success-btn">{{ editUserID ? 'UPDATE' : 'SEND INVITATION' }}</button>
                </div>
              </div>
            </div>
            <div v-else class="margin-y-xxl">
              <div class="d-flex mb-3 justify-end items-center">
                <GlobalSiteFilter name="user-fitler" @onApply="onApplyFilterSiteUser" :listSite="listSite"></GlobalSiteFilter>
              </div>
              <!-- Table users -->
              <v-data-table :loading="loadingTable" :items-per-page="200" hide-default-footer fixed-header :headers="headers" :items="listUser" item-key="id" class="le-table le-user-table le-scrollbar" :footer-props="{  itemsPerPageOptions: [25, 50, 100, 200], }">
                <template v-slot:item.user="{ item }">
                  <div class="flex padding-y-md">
                    <img class="object-cover margin-right-md" style="border-radius: 50%; background: #d3d3d3;" :src="item.avatar || '/img/a.png'" width="45" height="45" alt />
                    <div class="padding-right-md">
                      <div class="font-bold">{{item.first_name}} {{item.last_name}}</div>
                      <div style="font-size:12.5px;" class="color-primary font-normal">{{ item.email }}</div>
                    </div>
                  </div>
                </template>
                <template v-slot:item.role="{ item }">
                  <div class="d-flex items-center">
                    <div class="le-role-circle" :class="'role-'+item.roles[0].id"></div>
                    <div style="font-size: 12.5px;" class="font-normal">{{ getRoleName(item.roles[0]? item.roles[0].name : '')}}</div>
                  </div>
                </template>
                <template v-slot:item.status="{ item }">
                  <div class="le-table-status">
                    <img class="fill-height" v-if="item.status == 1" src="/img/icons/active.svg" alt />
                    <img class="fill-height" v-else src="/img/icons/inactive.svg" alt />
                  </div>
                </template>
                <template v-slot:item.sites="{ item }">
                  <div class="d-flex items-center">
                    <div :class="{'le-img-margin-minus': index < 3}" v-for="(flag, index) in getCountryIDFromSiteID(item.sites.map(i=> i.id))" :key="flag">
                      <img v-if="index < 3" width="30" :src="'/img/country/flags/'+ flag + '.svg'" alt />
                    </div>
                    <div v-tooltip="{ content: getHTMLRestCountry(item.sites.map(i=> i.id)) }" class="le-more-country le-img-margin-minus" v-if="getCountryIDFromSiteID(item.sites.map(i=> i.id)) && getCountryIDFromSiteID(item.sites.map(i=> i.id)).length > 3">+{{ getCountryIDFromSiteID(item.sites.map(i=> i.id)).length - 3 }}</div>
                  </div>
                </template>
                <template v-slot:item.created_at="{ item }">
                  <div :title="dayAgo(item.created_at)" class="d-flex">{{ formatDate(item.created_at) }}</div>
                </template>
                <template v-slot:item.actions="{ item }">
                  <div class="flex">
                    <img @click="editUserAction(item)" class="margin-right-md cursor-pointer" width="20" src="/img/icons/edit.svg" alt />
                    <img v-show="user && user.id != item.id" @click="deleteUserTable(item)" class="cursor-pointer le-delete-img" src="/img/icons/delete.svg" alt />
                  </div>
                </template>
              </v-data-table>
            </div>
          </div>

          <div v-show="step == 'clients'">
            <section v-if="!isShowAddClient" class="margin-top-xxl margin-bottom-xxxl">
              <div class="d-flex mb-3 justify-end items-center">
                <GlobalSiteFilter name="client-filter" @onApply="onApplyFilterSiteClient" :listSite="listSite"></GlobalSiteFilter>
              </div>
              <!-- Table Clients -->
              <v-data-table :items-per-page="200" hide-default-footer fixed-header :headers="headersClient" :items="listClient" item-key="id" class="le-table le-scrollbar">
                <template v-slot:item.name="{ item }">
                  <div class="color-primary font-semibold">{{ item.name }}</div>
                </template>
                <template v-slot:item.manager_name="{ item }">
                  <div class="color-primary">{{ item.manager_name }}</div>
                </template>
                <template v-slot:item.site_ids="{ item }">
                  <div class="d-flex items-center">
                    <div :class="{'le-img-margin-minus': index < 3}" v-for="(siteID, index) in item.site_ids" :key="'client-flag-'+siteID">
                      <img v-if="index < 3" width="30" :src="'/img/country/sites/'+ siteID + '.svg'" alt />
                    </div>
                    <div v-tooltip="{ content: getHTMLRestCountry(item.site_ids) }" class="le-more-country le-img-margin-minus" v-if="getCountryIDFromSiteID(item.site_ids) && getCountryIDFromSiteID(item.site_ids).length > 3">+{{ getCountryIDFromSiteID(item.site_ids).length - 3 }}</div>
                  </div>
                </template>
                <template v-slot:item.contact_name="{ item }">
                  <div class="padding-y-sm">
                    <div class="font-semibold">{{ item.contact_name }}</div>
                    <div class="color-primary text-sm">{{ item.email }}</div>
                  </div>
                </template>
                <template v-slot:item.created_at="{ item }">
                  <div :title="dayAgo(item.created_at)">{{ formatDate(item.created_at) }}</div>
                </template>
                <template v-slot:item.updated_at="{ item }">
                  <div :title="dayAgo(item.updated_at)">{{ formatDate(item.updated_at) }}</div>
                </template>
                <template v-slot:item.action="{ item }">
                  <div class="d-flex justify-center">
                    <img title="Click to edit" @click="editClientAction(item)" src="/img/icons/edit.svg" width="20" class="cursor-pointer mr-3" />
                    <img @click="deleteClient(item)" src="/img/icons/delete.svg" class="cursor-pointer le-delete-img padding-right-sm" />
                  </div>
                </template>
              </v-data-table>
            </section>

            <div class="margin-top-xl" v-else>
              <form style="max-width: 680px;" class="animate__animated animate__fadeIn animate__faster" @submit.prevent="callApiClient">
                <v-tabs class>
                  <v-tab>SITES</v-tab>
                  <v-tab>CLIENT PROFILE</v-tab>
                  <!-- Sites tab content -->
                  <v-tab-item>
                    <div class="margin-top-xl">
                      <v-checkbox :input-value="editClient.site_ids && editClient.site_ids.length == listSite.length" @change="toggleCheckAll([...arguments, 'listSite','id', editClient, 'site_ids'])" class="le-checkbox-site" label="All" hide-details></v-checkbox>
                      <v-checkbox class="le-checkbox-site" v-for="site in listSite" :key="site.id" v-model="editClient.site_ids" :label="site.description" :value="site.id" hide-details>
                        <template v-slot:label>
                          <div class="d-flex items-center">
                            <div style="flex: 0 0 200px;" class>{{ site.description }}</div>
                            <img v-if="site.country_id" width="28" :src="'/img/country/square/'+ site.country_id + '.png'" alt />
                          </div>
                        </template>
                      </v-checkbox>
                    </div>
                  </v-tab-item>

                  <!-- Profile content -->
                  <v-tab-item>
                    <div>
                      <section class="margin-top-xl" style="max-width: 350px;">
                        <div class="mb-4">
                          <div class="font-semibold margin-bottom-xs">
                            Name
                            <span class="color-error">*</span>
                          </div>
                          <v-text-field v-model="editClient.name" hide-details dense outlined></v-text-field>
                        </div>

                        <div class="mb-4">
                          <div class="font-semibold margin-bottom-xs">
                            Account Manager
                            <span class="color-error">*</span>
                          </div>
                          <v-select v-model="editClient.manager_id" :items="listUserManagerBySite" dense outlined hide-details></v-select>
                        </div>

                        <div class="mb-4">
                          <div class="font-semibold margin-bottom-xs">Title</div>
                          <v-text-field v-model="editClient.title" hide-details dense outlined></v-text-field>
                        </div>

                        <div class="mb-4">
                          <div class="font-semibold margin-bottom-xs">Contact Person</div>
                          <v-text-field v-model="editClient.contact_name" hide-details dense outlined></v-text-field>
                        </div>

                        <div class="mb-4">
                          <div class="font-semibold margin-bottom-xs">Phone</div>
                          <v-text-field v-model="editClient.phone_number" hide-details dense outlined></v-text-field>
                        </div>

                        <div class="mb-4">
                          <div class="font-semibold margin-bottom-xs">Email</div>
                          <v-text-field v-model="editClient.email" hide-details dense outlined type="email"></v-text-field>
                        </div>
                      </section>
                    </div>
                  </v-tab-item>
                </v-tabs>
                <div class="margin-y-xxl padding-right-lg d-flex justify-start">
                  <button type="button" @click="isShowAddClient = false, resetEditClient()" class="le-button padding-x-md margin-right-md">CANCEL</button>
                  <button :disabled="!isValidAddClient" type="submit" class="le-button padding-x-md le-button success-btn">{{ editClientID ? 'UPDATE' : 'CREATE' }}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LOCALSTORAGE } from '../constants/app-constants';
import { mapState } from 'vuex';
import Api from '../api';
import { API_PATH, API_STATUS } from '../constants/api-constants';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      isAdminRole: false,
      filterData: {
        navSeachUser: '',
        navSeachClient: '',
        searchClient: '',
        listSiteUser: [],
        listSiteClient: [],
      },
      loadingTable: false,
      // User details data
      user: {},
      current_password: '',
      password: '',
      password_confirmation: '',
      // Image
      imgAvatar: null,
      step: 'details', // ['details','pass','user']
      listUser: [],
      listRoleEditPopup: [],
      isShowCurrentPass: false,
      isShowNewPass: false,
      isShowRePass: false,
      headers: [
        {
          text: 'User',
          value: 'user',
          class: 'le-table-label padding-left-0',
          sortable: false,
        },
        {
          text: 'Role',
          value: 'role',
          class: 'le-table-label',
          // width: 200,
          sortable: false,
        },
        {
          text: 'Status',
          value: 'status',
          class: 'le-table-label',
          // width: 100,
        },
        {
          text: 'Site',
          value: 'sites',
          class: 'le-table-label',
          // width: 150,
          sortable: false,
        },
        {
          text: 'Created date',
          value: 'created_at',
          class: 'le-table-label',
          sortable: false,
        },
        {
          text: 'Actions',
          value: 'actions',
          class: 'le-table-label',
          width: 100,
          sortable: false,
        },
      ],
      // Pagination
      page: 1,
      pagination: {
        items_per_page: 7,
        total_items: 0,
        current: 0,
        last: 0,
      },
      // Edit User
      editUserID: null,
      isShowAddUser: false,
      userSiteSelected: [],
      editUser: {
        avatar: '',
        first_name: '',
        last_name: '',
        email: '',
        site_ids: [],
        client_ids: [],
        // Need transform
        role_id: null,
        status: true,
      },
      // End Edit User
      // Client and USERS
      editClient: {
        name: '',
        contact_name: '',
        phone_number: '',
        title: '',
        email: '',
        manager_id: null,
        site_ids: [],
      },
      listUserManager: [],
      listSite: [],
      isShowAddClient: false,
      editClientID: 0,
      listClient: [],
      // prettier-ignore
      headersClient: [
        { text: 'Name', value: 'name', class: 'le-table-label padding-left-0', },
        { text: 'Account manager', value: 'manager_name', class: 'le-table-label', },
        { text: 'Contact person', value: 'contact_name', class: 'le-table-label', },
        { text: 'Site', value: 'site_ids', class: 'le-table-label' },
        { text: 'Create at', value: 'created_at', class: 'le-table-label' },
        { text: 'Updated at', value: 'updated_at', class: 'le-table-label' },
        { text: 'Action', value: 'action', class: 'le-table-label',width: 100,  align: 'center', sortable: false, },
      ],
      // End Client and USERS
      debouceGetListUser: undefined,
      debouceGetListClient: undefined,
    };
  },
  computed: {
    ...mapState('auth', {
      userData: (state) => state.userData,
    }),
    isValidAddClient() {
      return (
        this.editClient.name &&
        this.editClient.manager_id &&
        this.editClient.site_ids.length
      );
    },
    isValidAddUser() {
      return (
        this.editUser.email &&
        this.editUser.first_name &&
        this.editUser.role_id &&
        this.editUser.site_ids.length &&
        this.editUser.client_ids.length
      );
    },
    listClientBySite() {
      return this.listClient
        .filter(
          (i) => _.intersection(i.site_ids, this.editUser.site_ids).length,
        )
        .filter((k) =>
          String(k.name)
            .toLowerCase()
            .includes(this.filterData.searchClient.toLowerCase()),
        );
    },
    listUserManagerBySite() {
      return this.listUserManager.filter(
        (i) => _.intersection(i.sites, this.editClient.site_ids).length,
      );
    },
  },
  mounted() {
    $('body').on('click', '#le-avatar-remove', () => {
      this.imgAvatar = null;
    });
    $('body').on('click', '#le-avatar-upload', () => {
      $('#le-avatar-uploader').trigger('click');
    });

    $('body').on('click', '#le-avatar-user-remove', () => {
      this.editUser.avatar = null;
    });
    $('body').on('click', '#le-avatar-user-upload', () => {
      $('#le-avatar-user-uploader').trigger('click');
    });

    try {
      // For temp
      const userLocal = JSON.parse(localStorage.getItem(LOCALSTORAGE.USER));
      this.user = userLocal;

      this.getListUser();

      Api.get(API_PATH.ACCOUNT_INFO, { hideLoading: true }).then((res) => {
        const data = res.data._data;
        if (res.data._status == 1) {
          this.imgAvatar = data.model.avatar;
          //
        }
      });
    } catch (error) {
      console.error(error);
    }

    // Debounce API
    this.debouceGetListUser = _.debounce(() => {
      this.fetchUsers();
    }, 300);
    this.debouceGetListClient = _.debounce(() => {
      this.fetchClients();
    }, 300);
  },
  methods: {
    openAddNewClient() {
      this.setStep('clients');
      this.isShowAddClient = true;
    },
    isEqual(a, b) {
      console.log(_.cloneDeep(a), _.cloneDeep(b));
      return true
    },
    getListUser() {
      this.loadingTable = true;
      const listRoleAdmin = ['campaign-leader', 'system'];
      const isHasRolePermission = this.user.roles.some((i) =>
        listRoleAdmin.includes(i.name),
      );
      this.isAdminRole = isHasRolePermission;
      console.log(`getListUser -> isHasRolePermission`, isHasRolePermission);
      if (isHasRolePermission) {
        Api.get(API_PATH.ROLES, { hideLoading: true }).then((res) => {
          if (res.data._status == 1) {
            this.listRoleEditPopup = res.data._data.models;
          }
        });

        Api.get(API_PATH.SITES, { hideLoading: true }).then((res) => {
          console.log(`res sites`, res);
          if (res.data._status == 1) {
            const listData = res.data._data.models.map((i) => ({
              label: i.description,
              value: i.id,
            }));

            // Client
            this.listSite = res.data._data.models;
            console.log(`getListUser -> this.listSite`, this.listSite);
            this.editClient.site_ids = this.listSite.map((i) => +i.id);
            Api.get(API_PATH.CLIENTS).then((res) => {
              console.log(`CLIENTS -> res`, res);
              if (res.data._status == 1) {
                this.listClient = res.data._data.models;
              }
            });
            // End Client
          }
        });

        Api.get(API_PATH.USERS, { hideLoading: true })
          .then((res) => {
            const data = res.data._data;
            if (res.data._status == 1) {
              this.listUser = data.models.filter(
                (i) => i.email != this.user.email,
              );
              // Client select user
              this.listUserManager = data.models.map((i) => ({
                text: i.first_name + ' ' + (i.last_name ? i.last_name : ''),
                value: Number(i.id),
                sites: i.sites.map((k) => k.id),
              }));
              console.log(`this.listUserManager `, this.listUserManager);
              this.editUser.site_ids = this.listSite.map((i) => +i.id);
            }
          })
          .finally(() => {
            this.loadingTable = false;
          });
      }
    },
    fetchUsers() {
      Api.get(
        API_PATH.USERS +
          `?name=${
            this.filterData.navSeachUser
          }&site_ids=${this.filterData.listSiteUser.toString()}`,
      )
        .then((res) => {
          const data = res.data._data;
          if (res.data._status == 1) {
            this.listUser = data.models.filter(
              (i) => i.email != this.user.email,
            );
            // Client select user
            this.listUserManager = data.models.map((i) => ({
              text: i.first_name + ' ' + i.last_name,
              value: Number(i.id),
            }));
          }
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },
    fetchClients() {
      Api.get(
        API_PATH.CLIENTS +
          `?name=${
            this.filterData.navSeachClient
          }&site_ids=${this.filterData.listSiteClient.toString()}`,
      ).then((res) => {
        console.log(`CLIENTS -> res`, res);
        if (res.data._status == 1) {
          this.listClient = res.data._data.models;
        }
      });
    },
    //- UPLOAD IMAGE
    readURL(e, dataField) {
      const input = e.target;
      if (input.files && input.files[0]) {
        if (input.files[0].size > 520000) {
          Swal.fire(
            'The image is too large to upload',
            'Please up load image less than 500Kb for optimize loading time popup.',
            'error',
          );
          return;
        }
        const reader = new FileReader();
        const app = this;
        reader.readAsDataURL(input.files[0]); // convert to base64 string
        reader.onload = function (e) {
          const listDataField = dataField.split('.');
          if (listDataField.length == 1) {
            app[listDataField[0]] = e.target.result;
          }
          if (listDataField.length == 2) {
            app[listDataField[0]][listDataField[1]] = e.target.result;
          }
        };
      }
    },
    removeImage(dataField) {
      this[dataField] = null;
    },
    setStep(s) {
      this.step = s;
    },
    saveUpdateDetails() {
      const data = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        avatar: this.imgAvatar,
      };
      Api.put(API_PATH.SAVE_ACCOUNT_DETAILS, data).then((res) => {
        if (res.data._status == API_STATUS.SUCCESS) {
          const userData = res.data._data.model;
          const saveUserData = { ...this.user, ...userData };

          localStorage.setItem(LOCALSTORAGE.USER, JSON.stringify(saveUserData));
          this.$notify({
            title: 'Saved!',
            type: 'success',
          });
          setTimeout(() => {
            location.reload();
          }, 300);
        } else {
           this.$notify({
            title: res.data._messages.toString(),
            type: 'error',
          });
        }
      });
    },
    changePassword() {
      const data = {
        current_password: this.current_password,
        password: this.password,
        password_confirmation: this.password_confirmation,
      };
      Api.put(API_PATH.SAVE_ACCOUNT_PASSWORD, data).then((r) => {
        if (r.data._status == 1) {
          Swal.fire('Update details successful', '', 'success').then(() => {
            location.reload();
          });
        } else {
          let errorHTML = ``;
          r.data._messages.forEach(
            (i) =>
              (errorHTML += `<p class="margin-top-sm le-first-caps">${i}</p>`),
          );
          Swal.fire({
            icon: 'error',
            title: 'Opps!',
            html: errorHTML,
          });
        }
      });
    },
    getRoleName(role) {
      return _.startCase(_.toLower(role));
    },
    deleteUserTable(item) {
      Swal.fire({
        title: 'Do you want delete user?',
        text: "You won't be able to revert this!",
        showCloseButton: true,
        imageUrl: '/img/delete_dog.svg',
        // icon: 'question',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          Api.delete(API_PATH.USERS + '/' + item.id).then((res) => {
            this.$notify({
              title: 'User has been deleted!',
              type: 'success',
            });
            this.getListUser();
          });
        }
      });
    },
    // Client
    getListClient() {
      Api.get(API_PATH.CLIENTS).then((res) => {
        console.log(`CLIENTS -> res`, res);
        if (res.data._status == 1) {
          this.listClient = res.data._data.models;
        }
      });
    },
    editUserAction(user) {
      this.filterData.searchClient = '';
      this.isShowAddUser = true;
      this.editUserID = user.id;
      console.log(`editUserAction -> user`, user);
      this.editUser = {
        email: user.email || '',
        avatar: user.user || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        status: Boolean(user.status),
        role_id: user.roles[0].id,
        site_ids: user.sites.map((i) => i.id),
        client_ids: user.client_ids,
      };
    },
    callApiUser() {
      const userData = _.cloneDeep(this.editUser);
      if (userData.role_id) {
        userData.role_ids = [userData.role_id];
      } else {
        userData.role_ids = [];
      }
      delete userData.role_id;

      userData.status = Number(userData.status);
      console.log(userData);

      Api[this.editUserID ? 'put' : 'post'](
        API_PATH.USERS + (this.editUserID ? `/${this.editUserID}` : ''),
        userData,
      )
        .then((res) => {
          if (res.data._status == 1) {
            if (this.editUserID) {
              this.$notify({
                title: 'Updated!',
                type: 'success',
              });
            } else {
              this.$notify({
                title: 'Email sent invation was sent to ' + userData.email,
                type: 'success',
              });
            }

            this.getListUser();
            this.isShowAddUser = false;
            this.resetEditClient();
          } else {
            const messageError = res.data._messages
              .toString()
              .split(',')
              .join(', ');
            this.$notify({
              title: messageError,
              type: 'warning',
            });
          }
        })
        .finally(() => {});
    },
    resetEditUser() {
      this.editUserID = null;
      this.userSiteSelected = [];
      this.editUser = {
        avatar: '',
        email: '',
        first_name: '',
        last_name: '',
        status: true,
        role_ids: [],
        site_ids: this.listSite.map((i) => +i.id),
        client_ids: [],
      };
    },
    resetEditClient() {
      this.editClient = {
        name: '',
        contact_name: '',
        phone_number: '',
        title: '',
        email: '',
        manager_id: [],
        site_ids: this.listSite.map((i) => +i.id),
      };
    },
    callApiClient() {
      const { editClientID } = this;
      Api[editClientID ? 'put' : 'post'](
        API_PATH.CLIENTS + (editClientID ? '/' + editClientID : ''),
        this.editClient,
      )
        .then((res) => {
          console.log(`callApiClient -> res`, res);
          this.getListClient();
          if (res.data._status == 1) {
            this.$notify({
              title: 'Client created successfully!',
              type: 'success',
            });
            this.isShowAddClient = false;
            this.resetEditClient();
          } else {
            const message = res.data._messages.toString().split(',').join(', ');
            this.$notify({
              title: message,
              type: 'error',
            });
          }
        })
        .finally(() => {});
    },
    editClientAction(item) {
      console.log(`editClientAction -> item`, item);
      this.isShowAddClient = true;
      this.editClientID = item.id;
      this.editClient = {
        name: item.name,
        contact_name: item.contact_name,
        phone_number: item.phone_number,
        title: item.title,
        email: item.email,
        manager_id: item.manager_id || 1,
        site_ids: item.site_ids || [],
      };
    },
    deleteClient(item) {
      Swal.fire({
        title: 'Do you want delete client?',
        text: "You won't be able to revert this!",
        showCloseButton: true,
        imageUrl: '/img/delete_dog.svg',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          Api.delete(API_PATH.CLIENTS + '/' + item.id).then((res) => {
            this.$notify({
              title: 'Client has been deleted!',
              type: 'success',
            });
            this.getListClient();
          });
        }
      });
    },
    formatDate(date) {
      return moment(moment.utc(date).toDate()).local().format('MMM DD, Y');
    },
    toggleCheckAll(v) {
      let [isCheck, listName, valueKey, checkObj, checkKey] = v;
      console.log(
        'toggleCheckAll',
        isCheck,
        listName,
        valueKey,
        checkObj,
        checkKey,
      );
      if (isCheck) {
        checkObj[checkKey] = this[listName].map((i) => i[valueKey]);
      } else {
        checkObj[checkKey] = [];
      }
    },
    getCountryIDFromSiteID(listSiteID = []) {
      return _.union(
        listSiteID.map((id) =>
          _.get(
            this.listSite.find((i) => i.id == id),
            'country_id',
          ),
        ),
      );
    },
    getHTMLRestCountry(listSiteID = []) {
      let html = ``;
      const listCountry = _.union(
        listSiteID.map((id) =>
          _.get(
            this.listSite.find((i) => i.id == id),
            'country_id',
          ),
        ),
      );
      if (listCountry.length > 3) {
        const listRest = listCountry.filter((i, index) => index > 2);
        listRest.forEach((flag) => {
          html += `
          <img width="30" class="" src="/img/country/flags/${flag}.svg" alt />
          `;
        });
      }
      return html;
    },
    // End Client
    dayAgo(day) {
      return moment(new Date(day)).fromNow();
    },
    // Filter site
    onApplyFilterSiteUser(v) {
      console.log(`onApplyFilterSiteUser -> onApplyFilterSiteUser`, v);
      this.filterData.listSiteUser = v;
      this.fetchUsers();
    },
    onApplyFilterSiteClient(v) {
      console.log(`onApplyFilterSiteClient -> onApplyFilterSiteClient`, v);
      this.filterData.listSiteClient = v;
      this.fetchClients();
    },
    // End Filter site
  },
};
</script>

<style lang="scss" scoped>
.v-input--is-disabled {
  background-color: #f8f8f8 !important;
}
.theme--light.v-input.v-input--is-disabled,
.theme--light.v-input.v-input--is-disabled input,
.theme--light.v-input.v-input--is-disabled textarea {
  color: #c0c0c0 !important;
}
.le-checkbox-site {
  margin-top: 5px !important;
}
.v-select.v-text-field--outlined:not(.v-text-field--single-line).v-input--dense
  .v-select__selections {
  padding: 2px 0;
}
</style>
