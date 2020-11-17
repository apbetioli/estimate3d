package Alien::wxWidgets::Config::mac_3_0_2_uni_nc_0;

use strict;

our %VALUES;

{
    no strict 'vars';
    %VALUES = %{
$VAR1 = {
          'link_libraries' => ' -L/Users/buildbot/slic3r/local-lib/lib/perl5/darwin-thread-multi-2level/Alien/wxWidgets/osx_cocoa_3_0_2_uni/lib',
          'linker' => 'clang++  -mmacosx-version-min=10.7',
          'link_flags' => '',
          'defines' => '-D_FILE_OFFSET_BITS=64 -DWXUSINGDLL -D__WXMAC__ -D__WXOSX__ -D__WXOSX_COCOA__ ',
          'alien_base' => 'mac_3_0_2_uni_nc_0',
          'c_flags' => '-UWX_PRECOMP ',
          'alien_package' => 'Alien::wxWidgets::Config::mac_3_0_2_uni_nc_0',
          'compiler' => 'clang++  -mmacosx-version-min=10.7',
          'config' => {
                        'unicode' => 1,
                        'toolkit' => 'mac',
                        'build' => 'multi',
                        'mslu' => 0,
                        'debug' => 0,
                        'compiler_kind' => 'nc',
                        'compiler_version' => 0
                      },
          '_libraries' => {
                            'stc' => {
                                       'dll' => 'libwx_osx_cocoau_stc-3.0.dylib',
                                       'link' => '-lwx_osx_cocoau_stc-3.0'
                                     },
                            'adv' => {
                                       'link' => '-lwx_osx_cocoau_adv-3.0',
                                       'dll' => 'libwx_osx_cocoau_adv-3.0.dylib'
                                     },
                            'media' => {
                                         'dll' => 'libwx_osx_cocoau_media-3.0.dylib',
                                         'link' => '-lwx_osx_cocoau_media-3.0'
                                       },
                            'net' => {
                                       'link' => '-lwx_baseu_net-3.0',
                                       'dll' => 'libwx_baseu_net-3.0.dylib'
                                     },
                            'html' => {
                                        'dll' => 'libwx_osx_cocoau_html-3.0.dylib',
                                        'link' => '-lwx_osx_cocoau_html-3.0'
                                      },
                            'xml' => {
                                       'link' => '-lwx_baseu_xml-3.0',
                                       'dll' => 'libwx_baseu_xml-3.0.dylib'
                                     },
                            'xrc' => {
                                       'dll' => 'libwx_osx_cocoau_xrc-3.0.dylib',
                                       'link' => '-lwx_osx_cocoau_xrc-3.0'
                                     },
                            'base' => {
                                        'link' => '-lwx_baseu-3.0',
                                        'dll' => 'libwx_baseu-3.0.dylib'
                                      },
                            'gizmos' => {
                                          'dll' => 'libwx_osx_cocoau_gizmos-3.0.dylib',
                                          'link' => '-lwx_osx_cocoau_gizmos-3.0'
                                        },
                            'propgrid' => {
                                            'link' => '-lwx_osx_cocoau_propgrid-3.0',
                                            'dll' => 'libwx_osx_cocoau_propgrid-3.0.dylib'
                                          },
                            'aui' => {
                                       'dll' => 'libwx_osx_cocoau_aui-3.0.dylib',
                                       'link' => '-lwx_osx_cocoau_aui-3.0'
                                     },
                            'animate' => {
                                           'link' => '-lwx_osx_cocoau_animate-3.0',
                                           'dll' => 'libwx_osx_cocoau_animate-3.0.dylib'
                                         },
                            'gl' => {
                                      'link' => '-lwx_osx_cocoau_gl-3.0',
                                      'dll' => 'libwx_osx_cocoau_gl-3.0.dylib'
                                    },
                            'richtext' => {
                                            'link' => '-lwx_osx_cocoau_richtext-3.0',
                                            'dll' => 'libwx_osx_cocoau_richtext-3.0.dylib'
                                          },
                            'core' => {
                                        'dll' => 'libwx_osx_cocoau_core-3.0.dylib',
                                        'link' => '-lwx_osx_cocoau_core-3.0'
                                      },
                            'webview' => {
                                           'link' => '-lwx_osx_cocoau_webview-3.0',
                                           'dll' => 'libwx_osx_cocoau_webview-3.0.dylib'
                                         },
                            'qa' => {
                                      'link' => '-lwx_osx_cocoau_qa-3.0',
                                      'dll' => 'libwx_osx_cocoau_qa-3.0.dylib'
                                    },
                            'fl' => {
                                      'link' => '-lwx_osx_cocoau_fl-3.0',
                                      'dll' => 'libwx_osx_cocoau_fl-3.0.dylib'
                                    },
                            'ribbon' => {
                                          'link' => '-lwx_osx_cocoau_ribbon-3.0',
                                          'dll' => 'libwx_osx_cocoau_ribbon-3.0.dylib'
                                        }
                          },
          'include_path' => '-I/Users/buildbot/slic3r/local-lib/lib/perl5/darwin-thread-multi-2level/Alien/wxWidgets/osx_cocoa_3_0_2_uni/lib/wx/include/osx_cocoa-unicode-3.0 -I/Users/buildbot/slic3r/local-lib/lib/perl5/darwin-thread-multi-2level/Alien/wxWidgets/osx_cocoa_3_0_2_uni/include/wx-3.0 ',
          'version' => '3.000002',
          'prefix' => '/Users/buildbot/slic3r/local-lib/lib/perl5/darwin-thread-multi-2level/Alien/wxWidgets/osx_cocoa_3_0_2_uni'
        };
    };
}

my $key = substr __PACKAGE__, 1 + rindex __PACKAGE__, ':';

sub values { %VALUES, key => $key }

sub config {
   +{ %{$VALUES{config}},
      package       => __PACKAGE__,
      key           => $key,
      version       => $VALUES{version},
      }
}

1;
